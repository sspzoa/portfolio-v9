# Agent Guide for portfolio-v9

This document is written for AI coding agents working on this project. It summarizes the architecture, conventions, and workflows you need to know before making changes.

---

## Project overview

`portfolio-v9` is a personal portfolio website for Seungpyo Suh, a mobile & frontend engineer. It is a single-page-style site with two routes:

- `/` — A minimal landing page with a short intro and a link to the portfolio.
- `/portfolio` — The full portfolio page showing sections such as About Me, Awards, Certificates, Skills, Careers, Experiences, Educations, Projects, GitHub Contributions, and Activities.

All dynamic content is fetched from Notion data sources at request time on the server. The project is designed to be deployed on Vercel.

---

## Technology stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.0.8 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI library | React 19.2.1 |
| Styling | Tailwind CSS v4 with custom design tokens |
| Validation | Zod (runtime schema validation for Notion responses) |
| Icons | `lucide-react` |
| CMS / data source | Notion API v1 (data sources) |
| GitHub calendar | `react-github-calendar` |
| Lint / format | Biome 2.2.0 |
| Package manager | Bun (`bun.lock`) |
| Deployment target | Vercel (with `@vercel/analytics` and `@vercel/speed-insights`) |

Removed from earlier versions:

- Jotai
- TanStack Query (React Query)
- `simple-icons`

---

## Project structure

```
.
├── public/                    # Static assets (photo, logos, og-image)
├── src/
│   ├── app/
│   │   ├── (pages)/           # Route groups
│   │   │   ├── (home)/
│   │   │   │   └── (routes)/
│   │   │   │       └── page.tsx
│   │   │   └── portfolio/
│   │   │       ├── (components)/              # Section components
│   │   │       └── (routes)/
│   │   │           └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css        # Design tokens, dark mode, base styles
│   │   ├── layout.tsx         # Root layout (metadata, providers)
│   │   ├── robots.ts          # robots.txt route handler
│   │   ├── sitemap.ts         # sitemap.xml route handler
│   │   └── ...
│   └── shared/
│       ├── components/        # Reusable UI components
│       ├── lib/               # Shared libraries
│       │   ├── env.ts         # Runtime environment variable validation
│       │   ├── notion.ts      # Notion API client
│       │   ├── notion-types.ts # Shared Notion property type helpers
│       │   ├── portfolio-data.ts # Server-side data fetching from Notion
│       │   └── provider.tsx   # App providers (currently a thin wrapper)
│       ├── schemas.ts         # Zod schemas and inferred TypeScript types
│       ├── types.ts           # Re-export of types from schemas.ts
│       └── utils/             # Utility functions (e.g. formatDate)
├── biome.json                 # Biome lint/format configuration
├── next.config.ts             # Next.js configuration (includes security headers)
├── package.json               # Scripts and dependencies
├── postcss.config.mjs         # Tailwind PostCSS plugin setup
├── tailwind.config.ts         # Custom theme (colors, font sizes, spacing, radius)
└── tsconfig.json              # TypeScript configuration
```

### Routing conventions

- The App Router is used. Pages are grouped under `src/app/(pages)/.../(routes)/page.tsx`.
- Route groups such as `(pages)`, `(home)`, and `(routes)` do **not** create URL segments; they are used only for code organization.
- There are **no API routes** for portfolio data. Data is fetched directly from Notion inside server components via `src/shared/lib/portfolio-data.ts`.

### Shared components

Components in `src/shared/components/` are reusable building blocks:

- `Section` — A titled section wrapper with an optional index number and count.
- `Card` — A media + text card used for projects and experiences.
- `Tag` — A small pill tag (supports an optional icon and a highlighted "main" style).
- `ListItem` — A compact list row with title, meta, and badge.
- `Button` — A simple button with primary / ghost variants.
- `Description` — Collapsible text renderer supporting markdown-like bold/links and bullet lists.
- `Skeleton` — Loading skeletons for cards, tags, descriptions, and list items.
- `Footer` — Site footer.

---

## Data flow

Portfolio content is stored in Notion. The application fetches it like this:

1. **Notion API client** — `src/shared/lib/notion.ts` provides `notionRequest<T>`, a typed wrapper around `fetch` that sends the required Notion headers. It reads `process.env.NOTION_TOKEN` via `src/shared/lib/env.ts`.
2. **Environment validation** — `src/shared/lib/env.ts` validates all required environment variables at startup using Zod. The app fails fast if any are missing.
3. **Schema validation** — `src/shared/schemas.ts` defines Zod schemas for every content type. Inferred TypeScript types are exported from the same file and re-exported from `src/shared/types.ts`.
4. **Server-side data fetching** — `src/shared/lib/portfolio-data.ts` defines `getPortfolioData()` and individual `fetchXxx()` functions. Each function calls a Notion data source, maps properties to the shared types, and validates the result with Zod.
5. **Server components** — `src/app/(pages)/portfolio/(routes)/page.tsx` and each section component are server components. They call the appropriate `fetchXxx()` function directly and render the result.
6. **Error handling** — Each section wraps its fetch in `try/catch` and renders a fallback message if data cannot be loaded.

### Required environment variables

The following environment variables must be present at build/run time (usually in `.env.local`):

- `NOTION_TOKEN` — Notion integration token.
- `ABOUTME_DATA_SOURCE_ID`
- `ACTIVITIES_DATA_SOURCE_ID`
- `AWARDS_DATA_SOURCE_ID`
- `CAREERS_DATA_SOURCE_ID`
- `CERTIFICATES_DATA_SOURCE_ID`
- `EDUCATIONS_DATA_SOURCE_ID`
- `EXPERIENCES_DATA_SOURCE_ID`
- `PROJECTS_DATA_SOURCE_ID`
- `SKILLS_DATA_SOURCE_ID`

These values are read by server-side code only (`portfolio-data.ts`, `notion.ts`, `env.ts`). Do not expose them to the browser.

---

## Build and test commands

The project uses Bun. All relevant scripts are in `package.json`:

```bash
# Start the development server (Turbopack)
bun run dev

# Create an optimized production build
bun run build

# Start the production server
bun run start

# Run Biome linter
bun run lint

# Run Biome formatter
bun run format
```

### Notes on commands

- `next build` generates static pages for `/`, `/robots.txt`, and `/sitemap.xml`, and a dynamic server-rendered page for `/portfolio`.
- There is no test runner configured. If you add tests, introduce a framework such as Vitest or Jest and add a corresponding `test` script.
- The build may emit a warning about an outdated `baseline-browser-mapping` package. This is non-fatal.

---

## Code style guidelines

### Formatter / linter

Biome handles both linting and formatting. Configuration is in `biome.json`. Key rules:

- Indentation: 2 spaces.
- Line width: 120 characters.
- Line ending: LF.
- Quotes: double quotes, JSX double quotes.
- Semicolons: always.
- Trailing commas: all in JavaScript/TypeScript, none in JSON.
- Bracket same line: true.
- Organize imports on save/format.
- CSS files are excluded from formatting (`!**/*.css`).

Important Biome rule overrides:

- Accessibility rules for SVG titles, autofocus, key events, static element interactions, button types, semantic elements, and labels are turned off.
- `noUnusedImports` is an error.
- `useArrowFunction` is an error.
- `noNonNullAssertion`, `noExplicitAny`, `noImplicitAnyLet`, and `noArrayIndexKey` are off.
- `noDangerouslySetInnerHtml` is a warning.

### Naming and file conventions

- Prefer kebab-case for file names (e.g., `portfolio-data.ts`, `list-item.tsx`).
- React components are exported as named or default exports depending on usage.
- Client components must include `"use client";` at the top.
- Type imports should use `import type`.

### Styling conventions

- Tailwind CSS utility classes are used exclusively.
- Custom design tokens are defined in `tailwind.config.ts` and `globals.css`.
- Colors are semantic: `background-*`, `content-*`, `components-*`, `core-*`, `syntax-*`, `solid-*`, `line-*`.
- Dark mode is implemented with `prefers-color-scheme: dark` in `globals.css`; there is no theme toggle.
- Spacing and radius use numbered tokens: `spacing-100` (4px), `radius-400` (12px), etc.
- Typography uses custom text sizes: `text-display`, `text-title`, `text-heading`, `text-body`, `text-label`, `text-footnote`, `text-caption`.

---

## Development conventions

### State management pattern

- There is **no global client state library**.
- Data is fetched on the server inside section components.
- Any client-only UI state (e.g., the side-project toggle) uses local `useState`.

### Data fetching pattern

Server components fetch data directly:

```ts
import { fetchSkills } from "@/shared/lib/portfolio-data";

export async function SkillsSection({ index }: { index?: number }) {
  try {
    const skills = await fetchSkills();
    return <Section title="Skills">{/* ... */}</Section>;
  } catch {
    return <Section title="Skills"><p>Failed to load skills.</p></Section>;
  }
}
```

### Section component pattern

- Accept an optional `index?: number` prop for the numbered section title.
- Fetch data in the component body.
- Render a fallback UI on error.
- Use the `Section` component for consistent spacing and title styling.

---

## Testing instructions

There is currently no test suite in this project. To verify changes:

1. Run `bun run lint` to ensure code passes Biome checks.
2. Run `bun run build` to verify TypeScript compilation and page generation succeed.
3. Run `bun run start` and manually test `/` and `/portfolio` in a browser.
4. If you are working on Notion data fetching, verify that `NOTION_TOKEN` and the relevant `*_DATA_SOURCE_ID` values are set and the Notion data source is accessible.

---

## Security considerations

- Notion credentials (`NOTION_TOKEN` and `*_DATA_SOURCE_ID`) are server secrets. They are only read in `src/shared/lib/env.ts`, `src/shared/lib/notion.ts`, and `src/shared/lib/portfolio-data.ts`.
- `.env*` files are ignored by `.gitignore` and must never be committed.
- Security headers are configured in `next.config.ts`:
  - `Content-Security-Policy`
  - `Strict-Transport-Security`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
- `dangerouslySetInnerHTML` is allowed only as a warning; avoid introducing raw HTML rendering of untrusted content.

---

## Deployment

The project is intended for deployment on Vercel. Make sure to configure the environment variables listed above in the Vercel project dashboard. Static output is not enabled; the build produces both static pages and a server-rendered `/portfolio` page.
