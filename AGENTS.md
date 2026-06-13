# Agent Guide for portfolio-v9

This document is written for AI coding agents working on this project. It summarizes the architecture, conventions, and workflows you need to know before making changes.

---

## Project overview

`portfolio-v9` is a personal portfolio website for Seungpyo Suh, a mobile & frontend engineer. It is a single-page-style site with two routes:

- `/` — A minimal landing page with a short intro and a link to the portfolio.
- `/portfolio` — The full portfolio page showing sections such as About Me, Awards, Certificates, Skills, Careers, Experiences, Educations, Projects, GitHub Contributions, and Activities.

All dynamic content (skills, projects, careers, etc.) is fetched from Notion data sources at runtime via Next.js API routes. The project is designed to be deployed on Vercel.

---

## Technology stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.0.8 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI library | React 19.2.1 |
| Styling | Tailwind CSS v4 with custom design tokens |
| State management | Jotai (atoms) + TanStack Query (React Query) |
| Icons | `lucide-react`, `simple-icons` |
| CMS / data source | Notion API v1 (data sources) |
| Lint / format | Biome 2.2.0 |
| Package manager | Bun (`bun.lock`) |
| Deployment target | Vercel (with `@vercel/analytics` and `@vercel/speed-insights`) |

Additional notable dependencies:

- `react-github-calendar` — Renders the GitHub contribution graph on the portfolio page.
- `babel-plugin-react-compiler` — Used together with `reactCompiler: true` in `next.config.ts`.

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
│   │   │       ├── (atoms)/
│   │   │       │   └── usePortfolioStore.ts   # Jotai atoms for portfolio data
│   │   │       ├── (components)/              # Section components
│   │   │       ├── (hooks)/
│   │   │       │   └── usePortfolio.ts        # TanStack Query hooks
│   │   │       └── (routes)/
│   │   │           └── page.tsx
│   │   ├── api/               # Next.js Route Handlers that proxy Notion
│   │   │   ├── aboutme/route.ts
│   │   │   ├── activities/route.ts
│   │   │   ├── awards/route.ts
│   │   │   ├── careers/route.ts
│   │   │   ├── certificates/route.ts
│   │   │   ├── educations/route.ts
│   │   │   ├── experiences/route.ts
│   │   │   ├── projects/route.ts
│   │   │   └── skills/route.ts
│   │   ├── favicon.ico
│   │   ├── globals.css        # Design tokens, dark mode, base styles
│   │   ├── layout.tsx         # Root layout (metadata, providers)
│   │   └── ...
│   └── shared/
│       ├── components/        # Reusable UI components
│       ├── lib/               # Shared libraries (notion client, providers)
│       ├── types.ts           # Shared TypeScript interfaces
│       └── utils/             # Utility functions (e.g. formatDate)
├── biome.json                 # Biome lint/format configuration
├── next.config.ts             # Next.js configuration
├── package.json               # Scripts and dependencies
├── postcss.config.mjs         # Tailwind PostCSS plugin setup
├── tailwind.config.ts         # Custom theme (colors, font sizes, spacing, radius)
└── tsconfig.json              # TypeScript configuration
```

### Routing conventions

- The App Router is used. Pages are grouped under `src/app/(pages)/.../(routes)/page.tsx`.
- Route groups such as `(pages)`, `(home)`, `(routes)`, `(components)`, `(hooks)`, and `(atoms)` do **not** create URL segments; they are used only for code organization.
- API routes live in `src/app/api/*/route.ts` and export `GET` handlers.

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
- `motion.tsx` — Placeholder motion components (`FadeIn`, `StaggerContainer`, `StaggerItem`, `ScaleIn`). Currently they only wrap children.

---

## Data flow

The portfolio content is stored in Notion. The application fetches it like this:

1. **Notion API** — `src/shared/lib/notion.ts` provides `notionRequest<T>`, a thin wrapper around `fetch` that sends the `Authorization`, `Notion-Version`, and `Content-Type` headers. It reads `process.env.NOTION_TOKEN`.
2. **API routes** — Each `src/app/api/<resource>/route.ts` calls `notionRequest` against `/data_sources/${process.env.<RESOURCE>_DATA_SOURCE_ID}/query`, maps Notion properties to the shared TypeScript interfaces, and returns JSON.
3. **Hooks** — `src/app/(pages)/portfolio/(hooks)/usePortfolio.ts` defines one `useQuery` hook per resource. Each hook fetches `/api/<resource>`, stores the result in a Jotai atom via `select`, and uses a 5-minute `staleTime`.
4. **Atoms** — `src/app/(pages)/portfolio/(atoms)/usePortfolioStore.ts` defines one Jotai atom per resource so sections can read cached data without refetching.
5. **Section components** — Each portfolio section uses its hook for loading state and reads the atom value to render.

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

These values are read by server-side code only (API routes and `notionRequest`). Do not expose them to the browser.

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

- `next build` generates static pages for `/` and `/portfolio`, and dynamic route handlers for `/api/*`.
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

- Use kebab-case for file names (e.g., `use-portfolio.ts`, `list-item.tsx`). The existing codebase mostly follows this, with some exceptions such as `usePortfolioStore.ts`.
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

- Use TanStack Query for server-state (fetching from API routes).
- Use Jotai atoms for global client-state derived from server data.
- Each portfolio resource has a matching atom and hook. New sections should follow this pattern.

### API route pattern

Every API route follows the same shape:

```ts
import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";

export async function GET() {
  try {
    const notionResponse = await notionRequest<any>(
      `/data_sources/${process.env.RESOURCE_DATA_SOURCE_ID}/query`,
      { method: "POST" },
    );
    const items = notionResponse.results.map((result: any) => ({ ... }));
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
```

### Section component pattern

- Accept an optional `index?: number` prop for the numbered section title.
- Use the corresponding `useXxx` hook for loading state.
- Render skeletons while loading.
- Use the `Section` component for consistent spacing and title styling.

---

## Testing instructions

There is currently no test suite in this project. To verify changes:

1. Run `bun run lint` to ensure code passes Biome checks.
2. Run `bun run build` to verify TypeScript compilation and static generation succeed.
3. Run `bun run start` and manually test `/` and `/portfolio` in a browser.
4. If you are working on API routes, verify that `NOTION_TOKEN` and the relevant `*_DATA_SOURCE_ID` values are set and the Notion data source is accessible.

---

## Security considerations

- Notion credentials (`NOTION_TOKEN` and `*_DATA_SOURCE_ID`) are server secrets. They are only read in API routes and `src/shared/lib/notion.ts`.
- `.env*` files are ignored by `.gitignore` and must never be committed.
- `dangerouslySetInnerHTML` is allowed only as a warning; avoid introducing raw HTML rendering of untrusted content.
- The project enables the React Compiler. Ensure new components do not rely on patterns that the compiler may memoize unexpectedly.

---

## Deployment

The project is intended for deployment on Vercel. Make sure to configure the environment variables listed above in the Vercel project dashboard. Static output is not enabled; the build produces both static pages and serverless API route handlers.
