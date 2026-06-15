# AGENTS.md

Information for AI coding agents working on `portfolio-v9`.

## Project overview

This is the personal portfolio website of Seungpyo Suh, a Product Engineer. It is a single-page résumé site served at `https://sspzoa.io`. The site is built with Next.js (App Router) and React 19, styled with Tailwind CSS v4, and fetches all résumé content from Notion data sources at request time.

Key characteristics:

- Single route: `/` (all other paths redirect to `/`, e.g. `/portfolio`)
- Dynamic server rendering (`export const dynamic = "force-dynamic"` on the home page)
- Content lives in Notion; the site maps Notion database query results to typed domain models
- Dark/light mode follows `prefers-color-scheme` via CSS variables
- Hosted on Vercel (inferred from `@vercel/analytics`, `@vercel/speed-insights`, and `.vercel` in `.gitignore`)

## Technology stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.0.8 (App Router) |
| Runtime | Node.js >=20 |
| Language | TypeScript 5 (strict mode) |
| React | React 19.2.1 with the React Compiler enabled |
| Styling | Tailwind CSS v4 + custom design tokens as CSS variables |
| PostCSS | `@tailwindcss/postcss` |
| UI icons | `lucide-react` |
| Validation | `zod` |
| Package manager / lockfile | `bun.lock` (Bun) — `package.json` scripts are tool-agnostic |
| Lint / format | Biome 2.2.0 |
| Analytics | Vercel Analytics + Speed Insights |

## Build, dev, and quality commands

Use the package manager of your choice (Bun, npm, pnpm, yarn). The repo contains a `bun.lock` lockfile.

```bash
# Development server (Next.js dev)
bun dev

# Production build
bun build

# Start production server after build
bun start

# Lint (Biome check)
bun lint

# Lint with auto-fix
bun lint:fix

# Format (Biome format --write)
bun format
```

There is currently no test runner or test scripts. If you add tests, wire them into `package.json` under the conventional `test` script.

## Project structure

```text
src/
├── app/                              # Next.js App Router
│   ├── (pages)/(home)/(routes)/page.tsx   # Home page (server component)
│   ├── (pages)/(home)/(components)/       # Page-level section components
│   ├── globals.css                        # Tailwind import, CSS tokens, base styles
│   ├── layout.tsx                         # Root layout, metadata, JSON-LD, analytics
│   ├── error.tsx                          # Route error boundary (Korean UI)
│   ├── global-error.tsx                   # Root error boundary (Korean UI)
│   ├── manifest.ts                        # /manifest.webmanifest
│   ├── sitemap.ts                         # /sitemap.xml
│   ├── robots.ts                          # /robots.txt
│   ├── opengraph-image.tsx                # /opengraph-image
│   ├── apple-icon.tsx                     # /apple-icon.png
│   └── favicon.ico
└── shared/
    ├── components/                   # Reusable presentational components
    ├── lib/                          # Data fetching, providers, env validation
    ├── schemas.ts                    # Zod schemas and inferred domain types
    ├── types.ts                      # Shared TypeScript interfaces
    └── utils/                        # Small helpers (date/period formatting)

public/                             # Static assets
├── photo.jpg
├── sspzoa_logo.png
└── sspzoa_logo.svg
```

### `src/app`

- `layout.tsx` defines global metadata, viewport, JSON-LD Person schema, skip-to-content link, Vercel Analytics/Speed Insights, and wraps children in `Providers`.
- `page.tsx` assembles the home page: a responsive two-column layout with a sticky side navigation on large screens and a scrollable main column of résumé sections.
- `(components)/` contains async server components for each résumé section: `About`, `Careers`, `Experiences`, `Educations`, `Skills`, `Awards`, `Certificates`, `Projects`, `Activities`.
- `(components)/side-project-toggle.tsx` is a client component that toggles visibility of side projects.
- `(components)/side-nav.tsx` is a client component that highlights the current section via `IntersectionObserver`.

### `src/shared`

- `lib/notion.ts` — A small retry-aware Notion API client using `fetch`.
- `lib/notion-types.ts` — TypeScript shapes for Notion page properties returned by the API.
- `lib/portfolio-data.ts` — Functions that query each Notion data source and map the raw API responses into Zod-validated domain models. `getPortfolioData()` fetches all sections in parallel with `Promise.allSettled`. Errors are categorized as `DataFetchError` (network / API / config) or `DataValidationError` (schema mismatch).
- `lib/env.ts` — Validates required environment variables with Zod at import time.
- `lib/provider.tsx` — A placeholder provider wrapper; currently just renders children.
- `schemas.ts` / `types.ts` — Domain models: `AboutMe`, `Career`, `Experience`, `Education`, `Skill`, `Project`, `Award`, `Certification`, `Activity`.
- `utils/formatDate.ts` — Converts Notion `YYYY-MM-DD` dates into `YYYY.MM` strings.
- `utils/formatPeriod.ts` — Builds human-readable date ranges (e.g. `2024.01 – 2024.06` or `2024.01 – Present`).
- Components: `Section`, `TimelineEntry`, `RecordRow`, `ProjectItem`, `Description`, `Tag`, `Chip`, `Button`, `Footer`.

## Runtime architecture

### Data flow

1. The browser requests `/`.
2. Next.js renders `page.tsx` server-side.
3. Each section component calls its own `fetchXxx()` function from `src/shared/lib/portfolio-data.ts`.
4. `portfolio-data.ts` calls `notionRequest()` against the Notion API data-source endpoints.
5. Responses are mapped and validated with Zod schemas.
6. If a section fails:
   - Client/config errors (HTTP 4xx from Notion) show `"설정을 확인해 주세요."`
   - Other errors show `"일시적으로 데이터를 불러올 수 없습니다."`
   - Empty arrays cause the section to render `null` (hidden).

### Notion API integration

- Base URL: `https://api.notion.com/v1`
- API version: `2025-09-03`
- The client retries up to 3 times on 5xx / 429 / network errors with exponential backoff.
- Every request sets `Authorization: Bearer <NOTION_TOKEN>`, `Notion-Version`, and `Content-Type: application/json`.
- Responses are fetched with `cache: "no-store"` so content is always fresh.

### Environment variables

The following variables are required and validated in `src/shared/lib/env.ts`:

- `NOTION_TOKEN` — Notion integration token (must match `/^secret_[A-Za-z0-9_-]+$/`)
- `ABOUTME_DATA_SOURCE_ID`
- `ACTIVITIES_DATA_SOURCE_ID`
- `AWARDS_DATA_SOURCE_ID`
- `CAREERS_DATA_SOURCE_ID`
- `CERTIFICATES_DATA_SOURCE_ID`
- `EDUCATIONS_DATA_SOURCE_ID`
- `EXPERIENCES_DATA_SOURCE_ID`
- `PROJECTS_DATA_SOURCE_ID`
- `SKILLS_DATA_SOURCE_ID`

All data-source IDs must be valid UUIDs.

In development these variables are read from `.env.local` (gitignored). In production they must be set in the hosting environment (Vercel).

### Images

- Next.js `Image` is used for skill icons, project icons/covers, and logos.
- Remote images are only allowed from `https://prod-files-secure.s3.us-west-2.amazonaws.com` (Notion assets).
- Static assets live in `public/`.

## Styling conventions

### Tailwind setup

- Tailwind CSS v4 is imported in `src/app/globals.css` via `@import "tailwindcss"` and configured with `@config "../../tailwind.config.ts"`.
- `tailwind.config.ts` extends the theme with custom colors, font sizes, spacing, border radius, and a monospace font family. All color values reference CSS custom properties (e.g. `bg-background-standard-primary`).

### Design tokens

`src/app/globals.css` defines an exhaustive set of CSS variables for:

- Solid colors (`--solid-red`, `--solid-blue`, ...)
- Translucent colors (`--solid-translucent-red`, ...)
- Backgrounds (`--background-standard-primary`, `--background-inverted-secondary`)
- Content/text colors (`--content-standard-primary` ... `--content-inverted-quaternary`)
- Lines (`--line-divider`, `--line-outline`)
- Component fills and interaction states
- Core accent and status colors
- Syntax highlighting colors

A `prefers-color-scheme: dark` block overrides the relevant variables for dark mode.

### Typography

- Primary typeface: Wanted Sans Variable from a CDN (`cdn.jsdelivr.net`), with system-ui fallbacks.
- Monospace font stack is defined via `--font-mono`.
- Custom text sizes: `text-display`, `text-title`, `text-heading`, `text-body`, `text-label`, `text-footnote`, `text-caption`, and responsive hero sizes.

## Code style guidelines

The project uses Biome for linting and formatting. Key configuration points from `biome.json`:

- 2-space indentation, LF line endings, 120-character line width
- Double quotes for JS/TS strings and JSX attributes
- Trailing commas enabled for JS/TS, disabled for JSON
- Semicolons required
- Bracket same line for JSX
- Arrow functions always require parentheses
- Organize imports on save/fix
- Disabled a11y / correctness rules that conflict with intentional patterns, e.g.:
  - `noSvgWithoutTitle`
  - `useKeyWithClickEvents`
  - `useExhaustiveDependencies`
  - `noNonNullAssertion`
  - `noExplicitAny`
  - `noImgElement` (we intentionally use `next/image` or optimized static images)
- `noUnusedImports` is an error
- Tailwind class sorting is warned via `useSortedClasses`

When writing new code:

- Prefer named exports for components unless the file already uses default exports.
- Keep components small and colocate styles with Tailwind utility classes.
- Use the existing design-token classes (e.g. `text-content-standard-secondary`, `border-line-divider`, `py-spacing-600`).
- Add Zod schemas for any new domain data and keep inferred types in `src/shared/types.ts`.
- Put new shared components in `src/shared/components/`, new data helpers in `src/shared/lib/` or `src/shared/utils/`.

## Security considerations

`next.config.ts` applies strict security headers to all routes:

- `Content-Security-Policy` restricts sources, allows `'unsafe-eval'` and `'unsafe-inline'` for scripts/styles (required by Next.js/React runtime), and permits Vercel analytics/vitals scripts and the JSDelivr CDN for fonts.
- `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Permitted-Cross-Domain-Policies` are all set.
- `poweredByHeader: false` removes the `X-Powered-By` header.
- Keep the CSP in sync if you add new external scripts, styles, image hosts, or connection endpoints.
- Do not commit `.env.local` or any Notion tokens. `.gitignore` already ignores `.env*`.

## Deployment

- The project is intended for Vercel.
- Set all required environment variables in the Vercel dashboard before deploying.
- The home page is forced dynamic, so builds rely on Notion API availability at request time; there is no static pre-rendering of Notion content.
- Update `LAST_MODIFIED` in `src/app/sitemap.ts` when résumé content changes meaningfully.

## Useful reminders

- `page.tsx` uses `dynamic = "force-dynamic"`; do not change this unless you intentionally want to cache Notion data.
- Adding a new résumé section usually requires: a Notion data source, an env var ID, a Zod schema in `schemas.ts`, a fetch function in `portfolio-data.ts`, a section component in `src/app/(pages)/(home)/(components)/`, and an entry in the `SECTIONS` array in `page.tsx`.
- The project has no automated tests; run `bun build` and `bun lint` before committing to verify type safety and formatting.
