# AGENTS.md

> AI coding agent guide for `portfolio-v9`. This file describes the project as it actually exists in the repository, so refer to it before making changes.

## Project overview

This is a personal portfolio website for Seungpyo Suh, a full-stack engineer. It is built with [Next.js](https://nextjs.org/) App Router, [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS v4](https://tailwindcss.com/). The site is a single-page résumé/portfolio that renders sections such as About, Careers, Experiences, Educations, Skills, Awards, Certificates, Projects, and Activities.

Key facts:

- **Package manager/runtime:** Bun is used in local tooling (see `.claude/launch.json`), but standard npm scripts are also available.
- **Deployment target:** Vercel (evidenced by `@vercel/analytics` and `@vercel/speed-insights`).
- **Content source:** All résumé content is fetched at request time from [Notion](https://www.notion.so/) via the Notion API. There are no static JSON data files for content.
- **Language/locale:** The page language is `ko`, but UI labels and most code comments are in English. Some fallback copy is in Korean.
- **Site URL:** `https://sspzoa.io`
- **React Compiler:** Enabled in `next.config.ts` (`reactCompiler: true`). The Babel plugin is installed as a dev dependency.

## Technology stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16.0.8 (App Router) |
| UI library | React 19.2.1 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4, custom CSS variables |
| Font | Wanted Sans Variable (loaded from CDN) |
| Lint/Format | Biome 2.2.0 |
| Validation | Zod 4 |
| Analytics | Vercel Analytics + Speed Insights |
| Icons | lucide-react |
| Compiler | React Compiler (via Next.js flag) |

## Directory structure

```text
src/
  app/                 # Next.js App Router pages and global assets
    (pages)/(home)/    # Route groups (no URL segment)
      (components)/    # Section-specific React components
      (routes)/
        page.tsx       # Home page that composes all sections
    globals.css        # Design tokens, dark mode, scroll reveal animation
    layout.tsx         # Root layout with metadata, skip link, providers
    robots.ts          # /robots.txt route
    sitemap.ts         # /sitemap.xml route
    opengraph-image.tsx # /opengraph-image.png route
    twitter-image.tsx   # /twitter-image.png route
  shared/
    components/        # Reusable UI primitives (Section, TimelineEntry, Tag, etc.)
    lib/               # Data fetching, Notion client, env validation, provider shell
    schemas.ts         # Zod schemas for Notion data
    types.ts           # Re-export of types from schemas.ts
    utils/             # Date/period formatting helpers
public/                # Static assets (photo, logos, og-image)
```

### Routing

- The only public route is `/`, served by `src/app/(pages)/(home)/(routes)/page.tsx`.
- `/portfolio` is permanently redirected to `/` via `next.config.ts`.
- `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, and `twitter-image.tsx` are Next.js metadata route handlers.

## Build and run commands

Commands are defined in `package.json`:

```bash
# Development server (http://localhost:3000)
bun run dev
# or
npm run dev

# Production build
bun run build
# or
npm run build

# Start production server
bun run start
# or
npm run start

# Lint/check everything
bun run lint        # biome check

# Auto-format and fix issues
bun run format      # biome format --write
```

There is no separate test runner configured. `bun test` is not wired up and there are no test files in the repository.

## Environment variables

The application validates environment variables at startup in `src/shared/lib/env.ts` using Zod. You must provide the following variables, typically via `.env.local` (which is ignored by Git):

| Variable | Purpose |
|----------|---------|
| `NOTION_TOKEN` | Notion integration secret token |
| `ABOUTME_DATA_SOURCE_ID` | Notion data source ID for About content |
| `ACTIVITIES_DATA_SOURCE_ID` | Data source ID for Activities |
| `AWARDS_DATA_SOURCE_ID` | Data source ID for Awards |
| `CAREERS_DATA_SOURCE_ID` | Data source ID for Careers |
| `CERTIFICATES_DATA_SOURCE_ID` | Data source ID for Certificates |
| `EDUCATIONS_DATA_SOURCE_ID` | Data source ID for Educations |
| `EXPERIENCES_DATA_SOURCE_ID` | Data source ID for Experiences |
| `PROJECTS_DATA_SOURCE_ID` | Data source ID for Projects |
| `SKILLS_DATA_SOURCE_ID` | Data source ID for Skills |

If any required variable is missing, the app throws at import time with a clear list of validation failures.

### Important notes about environment variables

- Never commit `.env.local` or any file containing `NOTION_TOKEN`.
- The token needs read access to the Notion data sources referenced by the IDs above.
- On Vercel, add these values as project environment variables.

## Data architecture

### Notion integration

`src/shared/lib/notion.ts` is a thin fetch wrapper around the Notion REST API:

- Base URL: `https://api.notion.com/v1`
- API version header: `2025-09-03`
- Sends `Authorization: Bearer <NOTION_TOKEN>` and `Content-Type: application/json`
- Uses `cache: "no-store"` so data is fetched at request time
- Throws `NotionApiError` on non-OK responses

`src/shared/lib/portfolio-data.ts` exposes one async fetcher per section (e.g., `fetchProjects`, `fetchCareers`) and an aggregator `getPortfolioData()`. Each fetcher queries the corresponding data source via `/data_sources/<ID>/query`, maps Notion properties to plain objects, and validates them with Zod schemas from `src/shared/schemas.ts`.

### Server vs. client components

- Almost all section components are **async Server Components** that fetch their own data. They are imported and rendered in `page.tsx`.
- Interactive UI pieces are marked `"use client"`:
  - `Description` — expand/collapse long text and parses inline markdown-like syntax (`**bold**` and `[text](url)` links).
  - `SideNav` — observes section visibility with `IntersectionObserver` and highlights the active section.
  - `SideProjectToggle` — toggles visibility of side projects.
- `src/shared/lib/provider.tsx` exports a client-shell component named `Providers` that currently just renders children, but exists as an extension point.

### Content rendering conventions

- `Description` parses a small subset of Markdown-like syntax: bold wraps (`**text**`), inline links (`[text](url)`), and bullet lists starting with `-` or `•`.
- Do not store arbitrary HTML in Notion and render it with `dangerouslySetInnerHTML`. The codebase intentionally parses text into React nodes.
- Images are rendered with Next.js `<Image>` and must be served from allowed hostnames. `next.config.ts` currently allows `https://prod-files-secure.s3.us-west-2.amazonaws.com` for Notion-hosted files.

## Styling and design system

### Tailwind CSS setup

- Tailwind CSS v4 is used with the `@tailwindcss/postcss` plugin configured in `postcss.config.mjs`.
- `src/app/globals.css` imports Tailwind and references `tailwind.config.ts` via `@config`.
- `tailwind.config.ts` extends the theme with a custom color system, font sizes, spacing scale, and border-radius scale.

### Design tokens

All visual values are defined as CSS custom properties in `:root` (light mode) and overridden in `@media (prefers-color-scheme: dark)`:

- Solid colors (`--solid-*`)
- Translucent colors (`--solid-translucent-*`)
- Background colors (`--background-standard-*`, `--background-inverted-*`)
- Content/text colors (`--content-standard-*`, `--content-inverted-*`)
- Line/divider colors (`--line-*`)
- Component fills and interactive states (`--components-*`)
- Accent/status/syntax colors (`--core-*`, `--syntax-*`)

Tailwind maps these custom properties to classes such as `text-content-standard-primary`, `bg-components-fill-standard-secondary`, `border-line-divider`, etc.

### Typography

- Primary font: `Wanted Sans Variable` / `Wanted Sans`, loaded from `cdn.jsdelivr.net`.
- Monospace font stack is used for labels, dates, and captions via `font-mono`.
- Tailwind text sizes: `display`, `title`, `heading`, `body`, `label`, `footnote`, `caption`.

### Motion

- A CSS scroll-driven reveal animation (`reveal`) fades elements in as they enter the viewport.
- It is wrapped in `@supports (animation-timeline: view())` and respects `prefers-reduced-motion`.
- Only short leaf-level blocks (cards, rows, headers) should use `reveal`, never tall section wrappers.

## Code style guidelines

The project uses **Biome** for linting and formatting. Configuration is in `biome.json`.

### Formatter rules

- Indent: 2 spaces
- Line width: 120 characters
- Line ending: LF
- Quotes: double
- Semicolons: always
- Trailing commas: all
- JSX quotes: double
- Arrow parentheses: always
- Bracket same line: `true`
- Bracket spacing: `true`
- CSS files are excluded from formatting (`!**/*.css`)

### Linter/assist rules

- Auto-organize imports is enabled (`organizeImports: on`).
- `noUnusedImports` is an error.
- `useArrowFunction` is an error.
- `noDangerouslySetInnerHtml` is a warning.
- `useSortedClasses` is a warning (Tailwind class ordering).
- Several a11y rules are intentionally turned off because the project uses custom interactive patterns; still, prefer semantic HTML and accessible labels when adding new interactive elements.
- `noNonNullAssertion` is off, so `!` is allowed, but prefer safer patterns.

### Naming and organization

- Default export for most components (e.g., `export default function Footer()`).
- Named exports for section async components (e.g., `export async function ProjectsSection()`).
- File names are lowercase; component files use kebab-case.
- Path alias `@/*` maps to `src/*`.
- Date helpers are default exports from `src/shared/utils/`.

### Component patterns

- Section components accept `id?: string` and `index?: number` and render inside `Section`.
- Server Components should fetch data with `try/catch` and render a Korean fallback message on error: `일시적으로 데이터를 불러올 수 없습니다.`.
- If a section has no items, return `null` instead of an empty section.
- Use `formatPeriod(start, end, { present: true })` for careers/experiences/educations to show "Present" when there is no end date.
- Use `formatPeriod(start, end)` without options for projects and activities.

## Testing instructions

There is **no automated test suite** in this project (no Jest, Vitest, Playwright, or Cypress configured).

Recommended manual checks when making changes:

1. Run `bun run build` and confirm the production build succeeds.
2. Run `bun run lint` and resolve any errors or warnings.
3. Run `bun run format` before committing.
4. Verify all Notion data source IDs are present in `.env.local` before testing data-heavy pages.
5. Check both light and dark mode appearance in the browser.
6. Check responsive breakpoints (mobile, tablet, desktop).
7. Verify the skip link, side-nav highlight, and expand/collapse interactions are keyboard accessible.

## Security considerations

- **Secrets:** `NOTION_TOKEN` and Notion data source IDs are sensitive. They are read from environment variables, validated by Zod, and never sent to the client.
- **CSP:** `next.config.ts` sets a strict `Content-Security-Policy` header. It allows scripts/styles from `'self'`, inline scripts/styles for Next.js, `va.vercel-scripts.com` for Vercel scripts, and `cdn.jsdelivr.net` for the font. Images are restricted to `'self'`, `data:`, and the Notion S3 hostname. If you add a new external script, font, image domain, or iframe source, update the CSP accordingly.
- **Security headers:** The app also sends `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and a restrictive `Permissions-Policy`.
- **XSS prevention:** The app avoids `dangerouslySetInnerHTML`. Rich text from Notion is treated as plain text and optionally parsed into safe React nodes by `Description`.
- **Environment isolation:** `.env*` files and `.next/` output are ignored by Git.

## Deployment

The site is intended to be deployed on Vercel:

1. Push to the connected Git repository.
2. Set all required environment variables in the Vercel dashboard.
3. Vercel runs `next build` automatically.
4. `next start` is the production server entry point.

Because data is fetched at request time from Notion, the build does not need to pre-fetch content at build time, but runtime requests will fail if the Notion integration token is missing or invalid.

## Common gotchas

- The Notion API version is pinned. If you upgrade it, verify that property shapes in `src/shared/lib/notion-types.ts` still match the API responses.
- Data source fetchers run independently per section in `page.tsx`. If you want to reduce API calls, consider using `getPortfolioData()` and passing the result down, but this will change the streaming behavior of the page.
- `Providers` currently does nothing but is the intended place for future context providers.
- `description` text supports a tiny Markdown subset; do not assume full Markdown support.
- `formatDate` converts an ISO date string (`YYYY-MM-DD`) to a display string (`YYYY.MM`).
- The side-project toggle keys list items with a composite prefix (`main-${index}` or `side-${index}`) rather than relying on array index alone.
- React Compiler is enabled; the build pipeline expects the Babel plugin to be present.
