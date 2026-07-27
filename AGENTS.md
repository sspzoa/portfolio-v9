# AGENTS.md

Guidance for coding agents working in this repository.

## What this is

`portfolio-v9` — the personal portfolio / résumé site for **Seungpyo Suh** (Product Engineer), deployed at **https://sspzoa.io** on Vercel. A single-page site whose content is sourced live from Notion (used as a headless CMS) and rendered as a server-side, design-token-driven editorial layout. UI copy is Korean (`lang="ko"`); code, comments, and identifiers are English.

## Tech stack

| Concern | Choice | Notes |
| --- | --- | --- |
| Framework | **Next.js 16** App Router | React Server Components by default |
| UI | **React 19** + **React Compiler** | `reactCompiler: true` in `next.config.ts` |
| Language | **TypeScript 5**, `strict` | path alias `@/*` → `./src/*` |
| Styling | **Tailwind CSS v4** | config in `tailwind.config.ts`, loaded via `@config` in `globals.css`; PostCSS plugin `@tailwindcss/postcss` |
| Lint + format | **Biome 2.2** | single toolchain — **no ESLint, no Prettier** |
| Validation | **Zod 4** | env vars + all Notion data |
| Icons | **lucide-react** | |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` | |
| CMS | **Notion API** (`2025-09-03`) | one "data source" per section |
| Package manager | **Bun** | `bun.lock` is committed; Node ≥ 20 |

## Commands

Use **Bun**, never npm/yarn/pnpm.

```bash
bun install        # install deps
bun dev            # dev server (http://localhost:3000)
bun run build      # production build
bun start          # serve production build
bun run lint       # biome check (lint + format check, no writes)
bun run lint:fix   # biome check --write (autofix lint + format)
bun run format     # biome format --write (format only)
```

Always run `bun run lint` before considering a change complete; it is fast and is the project's only gate.

## Architecture & data flow

Notion is the source of truth. Each section of the page is backed by a separate Notion **data source**, addressed by an env var. The data pipeline lives in `src/shared/lib/`:

```
.env.local  ──►  env.ts (Zod-validated at import)
                    │
                    ▼
   portfolio-data.ts  ──uses──►  notion.ts  (notionRequest<T>: fetch + timeout + retry)
   fetchSkills(), fetchProjects(), …          │
        │  maps raw Notion page ─► plain object
        │  validates with Zod (schemas.ts)
        ▼
   typed domain objects (types.ts ← schemas.ts via z.infer)
        │
        ▼
   async Server Component sections render them
```

Key files:

- **`src/shared/lib/env.ts`** — Zod-validates every env var **at module import**. A missing/malformed var throws immediately and crashes the build/request. `NOTION_TOKEN` must match `secret_…`; every `*_DATA_SOURCE_ID` must be a UUID.
- **`src/shared/lib/notion.ts`** — low-level `notionRequest<T>()`. Wraps `fetch` with a 15s timeout (`AbortController`), 3 retries with exponential backoff (1s → 2s → 4s) on 5xx/429/network errors, and `cache: "no-store"`. Throws `NotionApiError` (carries status/method/endpoint).
- **`src/shared/lib/notion-types.ts`** — TypeScript shapes for raw Notion API responses (property primitives + per-section page types).
- **`src/shared/schemas.ts`** — Zod schema **and** the canonical TS type (via `z.infer`) for each entity. Dates are normalized to `YYYY.MM` strings here.
- **`src/shared/types.ts`** — re-exports the entity types + `SectionComponentProps`.
- **`src/shared/lib/portfolio-data.ts`** — one `fetch<Entity>()` per section: query the data source → map raw page → `schema.parse()`. Distinguishes failure modes:
  - `DataFetchError` — network / Notion API failure. `isConfigError()` returns `true` when the underlying `NotionApiError` is a 4xx (i.e. misconfiguration, not transient).
  - `DataValidationError` — Zod rejected the shape.
  - `getPortfolioData()` aggregates all fetches with `Promise.allSettled`; **`aboutMe` is required** (its rejection propagates), all other sections degrade to `[]`.
- **`src/shared/lib/errors.ts`** — `getErrorMessage()`, the shared Korean error copy for section boundaries (config error vs transient failure).
- **`src/shared/utils/formatDate.ts`** — ISO `YYYY-MM-DD` → `YYYY.MM` (warns + returns `null` on unexpected input).
- **`src/shared/utils/formatPeriod.ts`** — builds a `start – end` range label without orphan separators; `{ present: true }` renders `start – Present`.

## Directory layout

```
src/
  app/
    layout.tsx                       # root layout: metadata, JSON-LD, skip link, Analytics, Providers
    page.tsx                         # the home page ("/"); declares SECTIONS + layout
    globals.css                      # Tailwind import, @config, CSS-var design tokens (light/dark)
    error.tsx / global-error.tsx     # error boundaries (client)
    manifest.ts / sitemap.ts / robots.ts
    opengraph-image.tsx / apple-icon.tsx   # generated via next/og ImageResponse
  features/                          # components specific to the home page
    hero.tsx                         # name, tagline, photo
    nav.tsx                          # SideNav (desktop) + MobileHeader (mobile) + shared hooks (client)
    socials.tsx / footer.tsx
    side-project-toggle.tsx          # main/side project expander (client)
    sections/                        # async Server Component sections
      aboutme, projects, careers, experiences, skills, records, activities
  shared/
    ui/                              # reusable presentational primitives
      section, timeline-entry, record-row, record-group, project-card,
      chip, tag, button, description, collapsible
    markdown/parse.tsx               # server-safe markdown-lite parser (**bold**, links, lists)
    lib/                             # env, notion, notion-types, portfolio-data, errors, provider
    utils/                           # formatDate, formatPeriod
    schemas.ts / types.ts
```

## Conventions (follow these when editing)

**Server vs client.** Section components in `features/sections/` are **async Server Components** that fetch their own data. Only `nav`, `side-project-toggle`, and `collapsible` are `"use client"` (scroll observation / state). `Description` is a **server** component; when content needs a max-height toggle, wrap it in the client `Collapsible`. Default to a Server Component; reach for `"use client"` only when you need interactivity.

**Named exports everywhere.** No default exports except where Next.js requires them (`page.tsx`, `layout.tsx`, `error.tsx`, metadata files).

**Each section owns its error handling.** The pattern is uniform — copy it for new sections:

```tsx
export async function XSection({ index, id }: SectionComponentProps) {
  try {
    const items = await fetchX();
    if (items.length === 0) return null;          // empty → render nothing
    return <Section id={id} title="X" index={index} count={items.length}>…</Section>;
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

`getErrorMessage` is imported from `@/shared/lib/errors` — never redefine it locally. The `records` section consolidates three sources (Educations/Awards/Certificates) with `Promise.allSettled` so each degrades independently.

**Section order is content-priority.** `SECTIONS` in `page.tsx` drives both the page and navigation: About → Projects → Careers → Experiences → Skills → Records → Activities. Keep Projects near the top.

**Design tokens only — never raw values.** All spacing, color, radius, type, and motion come from the token scale in `tailwind.config.ts` (backed by CSS vars in `globals.css`):

- Tokens are **3-layer**: Layer 1 primitives (`--solid-*`) live in `globals.css` and are referenced only by Layer 2 semantic tokens; Tailwind exposes **Layer 2 only**. Never use `--solid-*` directly in components.
- Color (semantic): `content-standard-{primary,secondary,tertiary,quaternary}`, `background-standard-{primary,secondary}`, `line-{divider,outline}`, `components-*`, `core-{accent,accent-strong,accent-translucent}` (`accent-strong` is for text on light backgrounds). Use the inverted scales as needed.
- Spacing: `spacing-50 … spacing-1000` (`p-spacing-500`, `gap-spacing-400`).
- Radius: `radius-{sm,md,lg,full}`.
- Type: `text-{hero,title,heading,body,label,footnote}` — `hero` is fluid (`clamp()`), `body` has Korean-optimized 1.7 line-height. There is no `caption`/`display`; don't reintroduce them.
- Motion: `duration-{fast,base,slow}` + `ease-standard`. Animate only state changes (hover/focus/active nav/progress) — no scroll-reveal decorations.
- Layout: `max-w-content` (720px reading column), sidebar grid `lg:grid-cols-[240px_minmax(0,1fr)]`.
- **Exception:** Tailwind's built-in `tracking-wider` / `tracking-widest` are intentional and used throughout — they are *not* token violations; don't "fix" them. (`tracking-label-wide` is the one custom tracking token.)

**Theming.** Light/dark is pure CSS via `prefers-color-scheme` + `color-scheme: light dark` in `globals.css`. There is **no theme toggle and no JS theme state** — `Providers` (`shared/lib/provider.tsx`) is deliberately a pass-through. Don't add a theme context unless asked. Motion is globally dampened under `prefers-reduced-motion` and `scroll-behavior: smooth` only applies under `no-preference` — preserve that.

**Images.** Always `next/image` with explicit `width`/`height`/`sizes` and `draggable={false}`; decorative images get `alt=""`. Notion-hosted images come from `prod-files-secure.s3.us-west-2.amazonaws.com`, which is allow-listed in **both** `next.config.ts` `images.remotePatterns` **and** the CSP `img-src`.

**Fonts.** Wanted Sans (variable) is imported from a jsDelivr CDN at the top of `globals.css`; the mono stack is the `--font-mono` system stack (`font-mono`). jsDelivr is allow-listed in the CSP `style-src`/`font-src`.

**Accessibility.** Keep the skip link, `aria-*` attributes, and `focus-visible:ring-core-accent/50 … ring-offset-background-standard-primary` focus rings. (Several Biome a11y rules are intentionally disabled in `biome.json`, but new markup should still be accessible.)

**Formatting (Biome).** 2-space indent, 120-col width, double quotes, semicolons always, trailing commas everywhere, `bracketSameLine: true` (JSX closing `>` sits on the last prop line). Imports are auto-organized. CSS files are excluded from Biome (`!**/*.css`) — `globals.css` is hand-formatted. `useSortedClasses` (Tailwind class ordering) is a warning; `lint:fix` will sort.

## Adding a new portfolio section (checklist)

Because env validation and the data pipeline are strict, a new section touches several files in order:

1. `.env.local` — add `NEWSECTION_DATA_SOURCE_ID`.
2. `src/shared/lib/env.ts` — add it to `envSchema` (`.uuid()`).
3. `src/shared/lib/notion-types.ts` — add the raw page type.
4. `src/shared/schemas.ts` — add the Zod schema + exported type.
5. `src/shared/lib/portfolio-data.ts` — add `fetchNewSection()` following the existing map-then-`schema.parse()` shape, with the `DataFetchError` / `DataValidationError` try/catch.
6. `src/features/sections/newsection.tsx` — async section component (use the error-handling pattern above, `getErrorMessage` from `@/shared/lib/errors`).
7. `src/app/page.tsx` — add `{ id, label, Component }` to the `SECTIONS` array (drives the page, the desktop SideNav, and the MobileHeader indicator).
8. If it loads images from a new host: update **both** `next.config.ts` `remotePatterns` **and** the CSP `img-src` in `next.config.ts`.

## Gotchas

- **No caching by design.** `page.tsx` sets `export const dynamic = "force-dynamic"` and `notionRequest` uses `cache: "no-store"`, so every request hits Notion live. Don't add caching without discussing the freshness tradeoff.
- **Env validation runs at import.** A bad/missing env var fails the whole build/request — there's no graceful per-var fallback at that layer.
- **React Compiler is on.** Avoid hand-rolled `useMemo`/`useCallback`/`React.memo`; the compiler handles memoization.
- **CSP is strict** (`next.config.ts` `headers()`). Any new external script, style, font, image host, or connection target must be added to the matching `*-src` directive or it will be blocked at runtime.
- **Security headers** (HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) live in `next.config.ts` — preserve them.
- **`dangerouslySetInnerHTML`** is used once, for the hardcoded JSON-LD `Person` schema in `layout.tsx`. Don't introduce it elsewhere.
- **`/portfolio` permanently redirects to `/`** (configured in `next.config.ts`).
- **A stray dev server on :3000 breaks `bun start`** (EADDRINUSE); check before serving the production build.
