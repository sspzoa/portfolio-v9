# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

`portfolio-v9` — personal portfolio / résumé for **Seungpyo Suh** (Product Engineer), deployed at **https://sspzoa.io** on Vercel.

- Home (`/`) is a single-page editorial résumé. Content is live from **Notion** (headless CMS).
- Design tokens drive all UI. Layout is a sticky sidebar + reading column on large screens.
- UI copy is Korean (`lang="ko"`). **Code, comments, identifiers, and commit messages are English.**

Human-facing mirrors of these rules (keep them in sync when conventions change):

| URL | Purpose |
| --- | --- |
| `/design-system` | Production design system — tokens, patterns, component APIs |
| `/code-style` | Production engineering guide — architecture, data, security, playbooks |
| `/machine-readable` | Same résumé as monospaced Markdown |
| `/llms.txt` | Short LLM index (llmstxt.org) |
| `/llms-full.txt` | Full résumé Markdown (`text/markdown`) |

Footer on `/`, `/design-system`, `/code-style`, and `/machine-readable` links: `design system · code style · machine-readable`.

## Tech stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16.3** App Router | RSC by default; Turbopack |
| UI | **React 19.2** + **React Compiler** | `reactCompiler: true` in `next.config.ts` |
| Language | **TypeScript 7**, `strict` | `@/*` → `./src/*` |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` in `globals.css`; `@tailwindcss/postcss` |
| Lint + format | **Biome 2.5** | No ESLint, no Prettier |
| Validation | **Zod 4** | Env + Notion payloads |
| Icons | **lucide-react** (+ inline brand SVGs) | Brand marks removed upstream in lucide 1.x |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` | |
| CMS | **Notion API** (`2025-09-03`) | One data source per section (IDs hardcoded) |
| Package manager | **Bun** | `bun.lock` committed; Node ≥ 20.9 |

## Commands

Use **Bun** only — never npm / yarn / pnpm.

```bash
bun install        # install deps
bun dev            # http://localhost:3000
bun run build      # production build
bun start          # serve production build
bun run lint       # biome check (lint + format check)
bun run lint:fix   # biome check --write
bun run format     # biome format --write
```

Always run `bun run lint` before considering a change complete. It is the project's only local gate.

## Routes

| Path | Kind | Notes |
| --- | --- | --- |
| `/` | Page | Portfolio home; `dynamic = "force-dynamic"` |
| `/design-system` | Page | Tokens + UI docs; indexed |
| `/code-style` | Page | Code conventions; indexed |
| `/machine-readable` | Page | Markdown view; `force-dynamic` |
| `/llms.txt` | Route handler | Plain-text LLM index |
| `/llms-full.txt` | Route handler | Full Markdown résumé |
| `/portfolio` | Redirect | Permanent → `/` |

`sitemap.ts` includes `/`, `/design-system`, `/code-style`, `/machine-readable`, `/llms.txt`, `/llms-full.txt`.  
Root `layout.tsx` exposes `alternates.types` for `text/plain` → `/llms.txt` and `text/markdown` → `/llms-full.txt`.

## Architecture & data flow

Notion is the source of truth. Each home section has its own data source. Pipeline:

```
NOTION_TOKEN (.env.local)
  → env.ts (Zod at import) + hardcoded DATA_SOURCE_IDS
  → portfolio-data.ts  ──uses──►  notion.ts  (timeout, retry, no-store)
       map raw page → plain object → schemas.ts parse
  → typed entities (types.ts ← z.infer)
  → async Server Component sections  OR  portfolio-markdown.ts (llms / machine-readable)
```

### Key files

- **`src/shared/lib/env.ts`** — Validates `NOTION_TOKEN` (`secret_…`) at import. **Data source UUIDs are hardcoded** in `DATA_SOURCE_IDS` (not env vars). Missing/bad token fails the whole build/request.
- **`src/shared/lib/notion.ts`** — `notionRequest<T>()`: 15s `AbortController` timeout, 3 retries with exponential backoff (1s → 2s → 4s) on 5xx/429/network, `cache: "no-store"`. Throws `NotionApiError`.
- **`src/shared/lib/notion-types.ts`** — Raw Notion response shapes.
- **`src/shared/schemas.ts`** — Zod schemas + canonical types via `z.infer`. Dates normalized to `YYYY.MM`.
- **`src/shared/types.ts`** — Re-exports entity types + `SectionComponentProps`.
- **`src/shared/lib/portfolio-data.ts`** — `fetchAboutMe`, `fetchAwards`, … map-then-`schema.parse()`. Errors: `DataFetchError` (4xx → config via `isConfigError()`), `DataValidationError`. `getPortfolioData()` uses `Promise.allSettled`; **`aboutMe` is required** (rejection propagates); other sections degrade to `[]`.
- **`src/shared/lib/portfolio-markdown.ts`** — `formatPortfolioMarkdown()` / `formatLlmsTxt()` for `/machine-readable`, `/llms-full.txt`, `/llms.txt`. Section order matches home.
- **`src/shared/lib/errors.ts`** — `getErrorMessage()` (shared Korean section error copy). Never redefine locally.
- **`src/shared/utils/formatDate.ts`** — ISO `YYYY-MM-DD` → `YYYY.MM`.
- **`src/shared/utils/formatPeriod.ts`** — `start – end`; `{ present: true }` → `start – Present`.

## Directory layout

```
src/
  app/
    layout.tsx                 # metadata, JSON-LD, skip link, Analytics, Providers
    page.tsx                   # home: SECTIONS + sidebar shell
    globals.css                # Tailwind, tokens (light/dark), fonts
    error.tsx / global-error.tsx
    manifest.ts / sitemap.ts / robots.ts
    opengraph-image.tsx / apple-icon.tsx
    design-system/page.tsx     # production design system
    code-style/page.tsx        # production engineering guide
    machine-readable/page.tsx  # monospaced Markdown view
    llms.txt/route.ts
    llms-full.txt/route.ts
  features/                    # product surfaces
    docs/                      # DocShell + docs primitives
    hero.tsx / nav.tsx / socials.tsx / footer.tsx
    side-project-toggle.tsx    # client: main/side projects
    sections/                  # async Server Component sections
      aboutme, awards, certificates, careers, experiences,
      skills, educations, projects, activities
  shared/
    ui/                        # domain-light presentational primitives
      section, timeline-entry, record-row, record-group,
      project-card, chip, tag, button, description, collapsible
    markdown/parse.tsx         # **bold**, links, lists (server-safe)
    lib/                       # env, notion, portfolio-data, portfolio-markdown, errors, provider
    utils/                     # formatDate, formatPeriod
    schemas.ts / types.ts
```

## Home section order

`SECTIONS` in `src/app/page.tsx` drives the page, `SideNav`, and `MobileHeader`. Korean résumé-style order:

**About → Awards → Certificates → Careers → Experiences → Skills → Education → Projects → Activities**

Markdown export (`formatPortfolioMarkdown`) must stay in the same order. Awards / Certificates / Education are **separate sections** (not a single Records block).

## Conventions

### Server vs client

Default **Server Components**. `"use client"` only when needed:

| Client | Why |
| --- | --- |
| `features/nav.tsx` | IntersectionObserver, scroll progress |
| `features/side-project-toggle.tsx` | expand state |
| `shared/ui/collapsible.tsx` | max-height toggle |

`Description` is server; wrap in `Collapsible` when clamping height.

### Exports

**Named exports everywhere.** Default only where Next.js requires (`page.tsx`, `layout.tsx`, `error.tsx`, metadata route files).

### Section error handling

Copy this pattern for every section:

```tsx
export async function XSection({ index, id }: SectionComponentProps) {
  try {
    const items = await fetchX();
    if (items.length === 0) return null;
    return (
      <Section id={id} title="X" index={index} count={items.length}>
        …
      </Section>
    );
  } catch (error) {
    console.error("[XSection]", error);
    return (
      <Section id={id} title="X" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
```

### Design tokens only

No raw px/hex in components. Scale lives in `globals.css` (`:root` Layer 1/2 vars + `@theme` utilities).

- **3-layer tokens:** Layer 1 `--solid-*` only in `globals.css`. `@theme` exposes **Layer 2 semantic** utilities only. Never use `--solid-*` in components.
- **Color:** `content-standard-{primary,secondary,tertiary,quaternary}`, `background-standard-*`, inverted scales, `line-{divider,outline}`, `components-*`, `core-{accent,accent-strong,accent-translucent}` (`accent-strong` = text/links on light surfaces).
- **Status:** `status-{success,warning,danger,info}` + `*-translucent` — feedback only, not decoration.
- **Spacing:** `spacing-50` … `spacing-1000` (`p-spacing-500`, `gap-spacing-400`).
- **Radius:** `radius-{sm,md,lg,full}`.
- **Elevation:** `shadow-elevation-{1,2,3}` — overlays/modals; default surfaces use ring/border.
- **Z-index:** `z-{base,raised,sticky,overlay,modal,toast}` — no arbitrary `z-[999]`.
- **Icons:** `size-icon-{sm,md,lg}` (14/18/24). lucide + inline brand SVGs.
- **Type:** `text-{hero,title,heading,body,label,footnote}` — `hero` is fluid `clamp()`. No `caption`/`display`.
- **Motion:** `duration-{fast,base,slow}` + `ease-standard`. State changes only (hover/focus/active/nav progress) — no scroll-reveal.
- **Layout:** `max-w-content` (720px), shell `max-w-shell` (72rem), sidebar `lg:grid-cols-[240px_minmax(0,1fr)]`.
- **Exception:** Tailwind `tracking-wider` / `tracking-widest` are intentional. Custom tracking: `tracking-label-wide`.

Full visual reference: `/design-system`.

### Theming

Light/dark via `prefers-color-scheme` + `color-scheme: light dark` in CSS only. **No theme toggle / JS theme state.** `Providers` is a pass-through. `prefers-reduced-motion` dampens transitions; smooth scroll only under `no-preference`.

### React Compiler

Do **not** hand-roll `useMemo` / `useCallback` / `React.memo`.

### Images

Always `next/image` with `width` / `height` / `sizes`, `draggable={false}`; decorative `alt=""`.  
`images.unoptimized: true`. Notion files: `prod-files-secure.s3.us-west-2.amazonaws.com` — allow-list in **both** `remotePatterns` and CSP `img-src`.

### Fonts

Wanted Sans Variable (jsDelivr) in `globals.css`; mono via `--font-mono` / `font-mono`. jsDelivr in CSP `style-src` / `font-src`.

### Accessibility

Keep skip link (`#main-content`), `aria-*`, and  
`focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary`.  
Some Biome a11y rules are off in `biome.json`; new markup must still be accessible.

### Formatting (Biome)

| Rule | Value |
| --- | --- |
| indent | 2 spaces |
| lineWidth | 120 |
| quotes | double (JSX too) |
| semicolons | always |
| trailingCommas | all (JSON: none) |
| bracketSameLine | true |
| arrowParentheses | always |
| lineEnding | lf |

Imports auto-organized. CSS excluded from Biome (`!**/*.css`) — format `globals.css` by hand. `useSortedClasses` is warn; `lint:fix` sorts. `useArrowFunction` and `noUnusedImports` are errors.

### Naming

- Files: `kebab-case.tsx`
- Components: PascalCase named exports
- Fetchers: `fetchProjects`, `getPortfolioData`
- Errors: `DataFetchError`, `DataValidationError`, `NotionApiError`

### Comments

Do **not** add comments unless asked. No drive-by README/docs unless requested. Prefer updating `/code-style` + this file when conventions change.

## Adding a new portfolio section

1. Hardcode `NEWSECTION_DATA_SOURCE_ID` in `DATA_SOURCE_IDS` inside `src/shared/lib/env.ts`.
2. `src/shared/lib/notion-types.ts` — raw page type.
3. `src/shared/schemas.ts` — Zod schema + type.
4. `src/shared/lib/portfolio-data.ts` — `fetchNewSection()` + wire into `getPortfolioData()` if needed.
5. `src/shared/lib/portfolio-markdown.ts` — section in `formatPortfolioMarkdown()` (same order as home).
6. `src/features/sections/newsection.tsx` — async section + error pattern.
7. `src/app/page.tsx` — `{ id, label, Component }` in `SECTIONS`.
8. New image host → `remotePatterns` **and** CSP `img-src` in `next.config.ts`.

(Only `NOTION_TOKEN` lives in `.env.local`. Do not reintroduce per-section env UUIDs unless explicitly requested.)

## Shell pages (design-system / code-style)

Use **`DocShell`** from `features/docs/shell.tsx` (do not fork page chrome):

- Outer: `max-w-shell` + spacing padding
- `MobileHeader` + `lg` sticky aside (`SideNav`, brand → `#top`, subtitle, cross-links)
- `main#main-content` with `max-w-content`
- Shared `Footer` at bottom
- `id="top"` on the page header for MobileHeader / brand anchors
- Docs primitives (`DocSection`, `PropsTable`, `Callout`, …) live in `features/docs/primitives.tsx`

## Gotchas

- **No caching by design.** Home and machine-readable use `force-dynamic`; `notionRequest` uses `cache: "no-store"`. Do not add caching without discussing freshness.
- **Env validation at import.** Bad `NOTION_TOKEN` fails the whole process. Data source IDs are code, not env.
- **CSP is strict** (`next.config.ts`). New external script/style/font/img/connect targets need matching `*-src`.
- **Security headers** (HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy) — preserve them.
- **`dangerouslySetInnerHTML`** — only hardcoded JSON-LD `Person` in `layout.tsx`. Do not add more.
- **`/portfolio` → `/`** permanent redirect only; no `/ai` redirect (route is `/machine-readable`).
- **Stray dev server on :3000** breaks `bun start` (EADDRINUSE).
- When updating conventions, keep **AGENTS.md**, **`/code-style`**, and **`/design-system`** aligned.
