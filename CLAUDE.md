# CLAUDE.md

Guidance for Claude Code when working in this repository.

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
- **`src/shared/utils/formatDate.ts`** — ISO `YYYY-MM-DD` → `YYYY.MM` (warns + returns `null` on unexpected input).
- **`src/shared/utils/formatPeriod.ts`** — builds a `start – end` range label without orphan separators; `{ present: true }` renders `start – Present`.

## Directory layout

```
src/
  app/
    layout.tsx                       # root layout: metadata, JSON-LD, skip link, Analytics, Providers
    globals.css                      # Tailwind import, @config, CSS-var design tokens (light/dark)
    error.tsx / global-error.tsx     # error boundaries (client)
    manifest.ts / sitemap.ts / robots.ts
    opengraph-image.tsx / apple-icon.tsx   # generated via next/og ImageResponse
    (pages)/(home)/
      (routes)/page.tsx              # the home page ("/"); declares SECTIONS + layout
      (components)/                  # page-specific section components (async Server Components)
        aboutme, careers, experiences, educations, skills,
        awards, certificates, projects, activities,
        hero, socials, side-nav, side-project-toggle
  shared/
    components/                      # reusable presentational pieces
      section, timeline-entry, record-row, project-item,
      chip, tag, description, button, footer
    lib/                             # env, notion, notion-types, portfolio-data, provider
    utils/                           # formatDate, formatPeriod
    schemas.ts / types.ts
```

Parenthesized folders are **Next.js route groups** — they organize files without adding URL segments, so the page resolves to `/`.

## Conventions (follow these when editing)

**Server vs client.** Section components in `(components)/` are **async Server Components** that fetch their own data. Only `side-nav`, `side-project-toggle`, and `description` are `"use client"` (they need state / effects / scroll observation). Default to a Server Component; reach for `"use client"` only when you need interactivity.

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
// getErrorMessage: isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다."
```

**Design tokens only — never raw values.** All spacing, color, radius, and type come from the token scale defined in `tailwind.config.ts` (backed by CSS vars in `globals.css`). Use these, not arbitrary px/hex:

- Spacing: `spacing-50 … spacing-1000` (`p-spacing-500`, `gap-spacing-400`, `mt-spacing-850`).
- Color (semantic): `content-standard-{primary,secondary,tertiary,quaternary}`, `background-standard-{primary,secondary}`, `line-{divider,outline}`, `components-*`, `core-accent`. Use the inverted / status / solid / syntax scales as needed.
- Radius: `radius-100 … radius-800`, `radius-full`.
- Type: `text-{display,title,heading,body,label,footnote,caption}` and `text-hero-{sm,md,lg}` (each token bundles size + line-height + letter-spacing).
- **Exception:** Tailwind's built-in `tracking-wider` / `tracking-widest` are intentional and used throughout — they are *not* token violations; don't "fix" them. (`tracking-label-wide` is the one custom tracking token.)

**Theming.** Light/dark is pure CSS via `prefers-color-scheme` + `color-scheme: light dark` in `globals.css`. There is **no theme toggle and no JS theme state** — `Providers` (`shared/lib/provider.tsx`) is deliberately a pass-through. Don't add a theme context unless asked.

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
6. `src/app/(pages)/(home)/(components)/newsection.tsx` — async section component (use the error-handling pattern above).
7. `src/app/(pages)/(home)/(routes)/page.tsx` — add `{ id, label, Component }` to the `SECTIONS` array (drives both the page and the side-nav).
8. If it loads images from a new host: update **both** `next.config.ts` `remotePatterns` **and** the CSP `img-src` in `next.config.ts`.

## Gotchas

- **No caching by design.** `page.tsx` sets `export const dynamic = "force-dynamic"` and `notionRequest` uses `cache: "no-store"`, so every request hits Notion live. Don't add caching without discussing the freshness tradeoff.
- **Env validation runs at import.** A bad/missing env var fails the whole build/request — there's no graceful per-var fallback at that layer.
- **React Compiler is on.** Avoid hand-rolled `useMemo`/`useCallback`/`React.memo`; the compiler handles memoization.
- **CSP is strict** (`next.config.ts` `headers()`). Any new external script, style, font, image host, or connection target must be added to the matching `*-src` directive or it will be blocked at runtime.
- **Security headers** (HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`) live in `next.config.ts` — preserve them.
- **`dangerouslySetInnerHTML`** is used once, for the hardcoded JSON-LD `Person` schema in `layout.tsx`. Don't introduce it elsewhere.
- **`/portfolio` permanently redirects to `/`** (configured in `next.config.ts`).
