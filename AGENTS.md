# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

`portfolio-v9` — personal portfolio / résumé for **Seungpyo Suh** (Product Engineer), deployed at **https://sspzoa.io** on Vercel.

- Home (`/`) is a static manpage-style entry (name, affiliations, socials, link to the résumé).
- `/portfolio` is the single-page editorial résumé. Content is live from **Notion** (headless CMS).
- Design tokens drive all UI. Home is a single reading column. `/portfolio` is a sticky contents sidebar + reading column on large screens.
- UI copy is Korean (`lang="ko"`). **Code, comments, identifiers, and commit messages are English.**

## Tech stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16.3** App Router | RSC by default; Turbopack |
| UI | **React 19.2** + **React Compiler** | `reactCompiler: true` in `next.config.ts` |
| Language | **TypeScript 7**, `strict` | `@/*` → `./src/*` |
| Styling | **Tailwind CSS v4** | CSS-first `@theme` in `globals.css`; `@tailwindcss/postcss` |
| Lint + format | **Biome 2.5** | No ESLint, no Prettier |
| Validation | **Zod 4** | Env + Notion payloads |
| Icons | ASCII brackets (`[+]`, `[01]`, `[tag]`) | No icon library in chrome |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` | |
| CMS | **Notion API** (`2025-09-03`) | One data source per section (IDs hardcoded) |
| Package manager | **Bun** | `packageManager` in `package.json`, `bun.lock` committed; Bun ≥ 1.2, Node ≥ 20.9 |

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
| `/` | Page | Static profile-card entry |
| `/portfolio` | Page | Editorial résumé; `dynamic = "force-dynamic"` |

`sitemap.ts` includes `/` and `/portfolio`.

## Architecture & data flow

Notion is the source of truth. Each home section has its own data source. Pipeline:

```
NOTION_TOKEN (.env.local)
  → env.ts (Zod at import) + hardcoded DATA_SOURCE_IDS
  → portfolio-data.ts  ──uses──►  notion.ts  (timeout, retry, no-store)
       map raw page → plain object → schemas.ts parse
  → typed entities (types.ts ← z.infer)
  → async Server Component sections
```

### Key files

- **`src/shared/lib/env.ts`** — Validates `NOTION_TOKEN` (`secret_…`) at import. **Data source UUIDs are hardcoded** in `DATA_SOURCE_IDS` (not env vars). Missing/bad token fails the whole build/request.
- **`src/shared/lib/notion.ts`** — `notionRequest<T>()`: 15s `AbortController` timeout, 3 retries with exponential backoff (1s → 2s → 4s) on 5xx/429/network, `cache: "no-store"`. Throws `NotionApiError`.
- **`src/shared/lib/notion-types.ts`** — Raw Notion response shapes.
- **`src/shared/schemas.ts`** — Zod schemas + canonical types via `z.infer`. Dates normalized to `YYYY.MM`.
- **`src/shared/types.ts`** — Re-exports entity types + `SectionComponentProps`.
- **`src/shared/lib/portfolio-data.ts`** — `fetchAboutMe`, `fetchAwards`, … map-then-`schema.parse()`. Errors: `DataFetchError` (4xx → config via `isConfigError()`), `DataValidationError`.
- **`src/shared/lib/errors.ts`** — `getErrorMessage()` (shared Korean section error copy). Never redefine locally.
- **`src/shared/utils/formatDate.ts`** — ISO `YYYY-MM-DD` → `YYYY.MM`.
- **`src/shared/utils/formatPeriod.ts`** — `start – end`; `{ present: true }` → `start – Present`.

## Directory layout

```
src/
  app/
    layout.tsx                 # metadata, JSON-LD, skip link, Analytics, Providers
    page.tsx                   # home: static profile-card entry
    portfolio/page.tsx         # résumé: SECTIONS + sidebar shell
    globals.css                # Tailwind, tokens (light/dark), fonts
    error.tsx / global-error.tsx
    manifest.ts / sitemap.ts / robots.ts
    opengraph-image.tsx / apple-icon.tsx
  features/                    # home + shared chrome
    hero.tsx / nav.tsx / socials.tsx / footer.tsx
    side-project-toggle.tsx    # client: main/side projects
    sections/                  # async Server Component sections
      aboutme, awards, certificates, careers, experiences,
      skills, educations, projects, activities
  shared/
    ui/                        # presentational primitives
      section, timeline-entry, record-row,
      project-card, chip, tag, button, description, collapsible
    markdown/parse.tsx         # **bold**, links, lists (server-safe)
    lib/                       # env, notion, portfolio-data, errors, provider
    utils/                     # formatDate, formatPeriod
    schemas.ts / types.ts
```

## Home section order

`SECTIONS` in `src/app/portfolio/page.tsx` drives the page, `Contents`, and `MobileHeader`. Korean résumé-style order:

**About → Awards → Certificates → Careers → Experiences → Skills → Education → Projects → Activities**

Awards / Certificates / Education are **separate sections** (not a single Records block).

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

The visual system is a terminal/manpage aesthetic inspired by opencode.ai (see `DESIGN.md`): all-monospace type, hairline rules, flat surfaces, ASCII bracket markers (`[+]`, `[01]`, `[tag]`, `>`) as the only iconography. Chroma follows the original cool slate theme, not the cream/ink marketing palette.

- **3-layer tokens:** Layer 1 `--solid-*` only in `globals.css` (ink/paper/slate ramp). `@theme` exposes **Layer 2 semantic** utilities only. Never use `--solid-*` in components.
- **Color:** `content-standard-{primary,secondary,tertiary,quaternary}`, `background-standard-*`, inverted scales, `line-{divider,outline}`, `components-*`, `core-{accent,accent-strong,accent-translucent}`. Canvas is cool white (`#ffffff` / `#0a0a0b` in dark) with slate-tinted fills and hairlines (`rgba(121, 123, 138, …)`). `core-accent` is slate blue (`#55759e`, `#8fafd5` in dark) for existing semantic uses (links, badges, focus, selection) — do not sprinkle it onto decorative marks. `--core-selection` is CSS-only (`::selection` in `globals.css`, not in `@theme`).
- **Spacing:** `spacing-50` … `spacing-1000` (`p-spacing-500`, `gap-spacing-400`).
- **Radius:** `radius-{sm,full}` only. `radius-sm` (4px) on interactive elements (buttons, focus rings); containers, images, and cards are sharp rectangles (no rounding).
- **Type:** `text-{hero,title,heading,body,label,footnote}` — `hero` is fluid `clamp()` (~28→38px). Letter-spacing is 0 everywhere; no `tracking-*` utilities, no `uppercase` labels. Section headers are `text-heading` + `font-bold`; use `font-bold` (700) / `font-medium` (500) — never `font-semibold` (600 is not loaded).
- **Depth:** no shadows, no gradients, no blur, no inverted surface blocks. Everything sits flat on the canvas; separation comes from 1px `line-divider` hairlines only.
- **Motion:** `duration-{fast,base,slow}` + `ease-standard`. State changes only (hover/focus/active/nav progress) — no scroll-reveal.
- **Layout:** `max-w-content` (720px) reading column. Home is single-column. Portfolio shell is `max-w-6xl` with `lg:grid-cols-[220px_minmax(0,1fr)]` sticky `## contents`.

### Theming

Light/dark via `prefers-color-scheme` + `color-scheme: light dark` in CSS only. **No theme toggle / JS theme state.** `Providers` is a pass-through. `prefers-reduced-motion` dampens transitions; smooth scroll only under `no-preference`.

### React Compiler

Do **not** hand-roll `useMemo` / `useCallback` / `React.memo`.

### Images

Always `next/image` with `width` / `height` / `sizes`, `draggable={false}`; decorative `alt=""`.  
`images.unoptimized: true`. Notion files: `prod-files-secure.s3.us-west-2.amazonaws.com` — allow-list in **both** `remotePatterns` and CSP `img-src`.

### Fonts

Latin stays monospaced **JetBrains Mono** (400/500/700) via jsDelivr Fontsource. Hangul falls through to **Pretendard Variable** (dynamic subset, `pretendard@1.3.9` on jsDelivr) so Korean body copy is not forced onto a coding-font grid. `body` and `--font-mono` share the same stack, so `font-mono` is a no-op kept for intent. jsDelivr in CSP `style-src` / `font-src`.

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
- Fetchers: `fetchProjects`
- Errors: `DataFetchError`, `DataValidationError`, `NotionApiError`

### Comments

Do **not** add comments unless asked. No drive-by README/docs unless requested. Prefer updating this file when conventions change.

## Adding a new portfolio section

1. Hardcode `NEWSECTION_DATA_SOURCE_ID` in `DATA_SOURCE_IDS` inside `src/shared/lib/env.ts`.
2. `src/shared/lib/notion-types.ts` — raw page type.
3. `src/shared/schemas.ts` — Zod schema + type.
4. `src/shared/lib/portfolio-data.ts` — `fetchNewSection()`.
5. `src/features/sections/newsection.tsx` — async section + error pattern.
6. `src/app/portfolio/page.tsx` — `{ id, label, Component }` in `SECTIONS`.
7. New image host → `remotePatterns` **and** CSP `img-src` in `next.config.ts`.

(Only `NOTION_TOKEN` lives in `.env.local`. Do not reintroduce per-section env UUIDs unless explicitly requested.)

## Gotchas

- **No caching by design.** `/portfolio` uses `force-dynamic`; `notionRequest` uses `cache: "no-store"`. `/` is static. Do not add caching without discussing freshness.
- **Env validation at import.** Bad `NOTION_TOKEN` fails the whole process. Data source IDs are code, not env.
- **CSP is strict** (`next.config.ts`). New external script/style/font/img/connect targets need matching `*-src`.
- **Security headers** (HSTS, `X-Frame-Options: DENY`, `nosniff`, Referrer-Policy, Permissions-Policy) — preserve them.
- **`dangerouslySetInnerHTML`** — only hardcoded JSON-LD `Person` in `layout.tsx`. Do not add more.
- **Stray dev server on :3000** breaks `bun start` (EADDRINUSE).
- When updating conventions, keep **AGENTS.md** current.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
