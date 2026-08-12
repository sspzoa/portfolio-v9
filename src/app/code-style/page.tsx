import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Footer } from "@/features/footer";
import { MobileHeader, SideNav } from "@/features/nav";

export const metadata: Metadata = {
  title: "Code Style · Seungpyo Suh",
  description: "Coding conventions, toolchain, and architecture rules for sspzoa.io.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://sspzoa.io/code-style",
  },
};

const NAV = [
  { id: "principles", label: "Principles" },
  { id: "stack", label: "Stack" },
  { id: "commands", label: "Commands" },
  { id: "structure", label: "Structure" },
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "format", label: "Format" },
  { id: "naming", label: "Naming" },
  { id: "styling", label: "Styling" },
  { id: "data", label: "Data" },
  { id: "a11y", label: "A11y & security" },
] as const;

const navItems = NAV.map(({ id, label }) => ({ id, label }));

const shellLinkClassName =
  "font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";

function DocSection({
  id,
  index,
  title,
  description,
  children,
}: {
  id: string;
  index: number;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-spacing-950 border-line-divider border-t pt-spacing-700 md:pt-spacing-800 lg:scroll-mt-spacing-900">
      <header className="mb-spacing-600 flex flex-col gap-spacing-200">
        <div className="flex items-baseline gap-spacing-400">
          <span
            aria-hidden="true"
            className="font-medium font-mono text-content-standard-quaternary text-footnote tabular-nums">
            {index.toString().padStart(2, "0")}
          </span>
          <h2 className="font-semibold text-content-standard-primary text-title tracking-tight">{title}</h2>
        </div>
        {description && <p className="max-w-content text-content-standard-secondary text-label">{description}</p>}
      </header>
      <div className="flex flex-col gap-spacing-700">{children}</div>
    </section>
  );
}

function Subgroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-spacing-400">
      <h3 className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

function RuleList({ items }: { items: readonly { title: string; body: ReactNode }[] }) {
  return (
    <ul className="flex flex-col gap-spacing-300 text-content-standard-secondary text-label">
      {items.map((item) => (
        <li key={item.title} className="border-line-divider border-t pt-spacing-300 first:border-t-0 first:pt-0">
          <span className="font-medium text-content-standard-primary">{item.title}</span> — {item.body}
        </li>
      ))}
    </ul>
  );
}

function CodeBlock({ children, caption }: { children: string; caption?: string }) {
  return (
    <figure className="flex flex-col gap-spacing-200">
      {caption && (
        <figcaption className="font-mono text-content-standard-quaternary text-footnote">{caption}</figcaption>
      )}
      <pre className="overflow-x-auto rounded-radius-md bg-components-fill-standard-secondary p-spacing-400 ring-1 ring-line-outline">
        <code className="whitespace-pre font-mono text-content-standard-primary text-footnote leading-relaxed">
          {children}
        </code>
      </pre>
    </figure>
  );
}

function KeyValueList({ rows }: { rows: readonly { key: string; value: string }[] }) {
  return (
    <ul className="flex flex-col">
      {rows.map((row) => (
        <li
          key={row.key}
          className="flex flex-col gap-spacing-50 border-line-divider border-t py-spacing-300 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-spacing-400">
          <code className="shrink-0 font-mono text-content-standard-primary text-footnote">{row.key}</code>
          <span className="font-mono text-content-standard-tertiary text-footnote sm:text-right">{row.value}</span>
        </li>
      ))}
    </ul>
  );
}

const SECTION_PATTERN = `export async function XSection({ index, id }: SectionComponentProps) {
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
        <p className="text-content-standard-secondary text-label">
          {getErrorMessage(error)}
        </p>
      </Section>
    );
  }
}`;

const TREE = `src/
  app/                 # routes, layout, metadata
  features/            # page-specific UI + sections
    sections/          # async Server Component sections
  shared/
    ui/                # presentational primitives
    lib/               # env, notion, portfolio-data, errors
    utils/             # formatDate, formatPeriod
    markdown/          # server-safe markdown-lite
    schemas.ts         # Zod + z.infer types
    types.ts           # re-exports`;

export default function CodeStylePage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-6xl px-spacing-500 md:px-spacing-700 lg:px-spacing-800">
      <MobileHeader items={navItems} />

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-spacing-850">
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-spacing-800">
          <div className="flex flex-col gap-spacing-150">
            <Link href="#top" className="font-semibold text-content-standard-primary text-label tracking-tight">
              Seungpyo Suh<span className="text-core-accent">.</span>
            </Link>
            <p className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
              Code Style
            </p>
          </div>

          <SideNav items={navItems} />

          <Link href="/" className={shellLinkClassName}>
            ← Portfolio
          </Link>
        </aside>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-w-0 max-w-content flex-col py-spacing-700 md:py-spacing-800">
          <header
            id="top"
            className="flex scroll-mt-spacing-950 flex-col gap-spacing-500 pb-spacing-200 lg:scroll-mt-spacing-900">
            <div className="flex justify-end lg:hidden">
              <Link href="/" className={shellLinkClassName}>
                ← Portfolio
              </Link>
            </div>
            <h1 className="font-semibold text-content-standard-primary text-hero">
              Code<span className="text-core-accent">.</span>
            </h1>
            <p className="max-w-content text-body text-content-standard-secondary">
              sspzoa.io 코드 컨벤션. UI 카피는 한국어(
              <code className="font-mono text-footnote">lang=&quot;ko&quot;</code>
              ), 식별자·주석·커밋은 영어. 게이트는 <code className="font-mono text-footnote">bun run lint</code> 하나.
              비주얼 토큰은{" "}
              <Link href="/design-system" className="text-core-accent-strong underline-offset-2 hover:underline">
                Design System
              </Link>
              .
            </p>
          </header>

          <div className="mt-spacing-850 flex flex-col gap-spacing-850 md:mt-spacing-900 md:gap-spacing-900">
            <DocSection
              id="principles"
              index={1}
              title="Principles"
              description="에이전트·기여자가 같은 결정을 반복하지 않도록 고정한 규칙.">
              <RuleList
                items={[
                  {
                    title: "Server by default",
                    body: (
                      <>
                        인터랙션이 필요할 때만 <code className="font-mono text-footnote">&quot;use client&quot;</code>.
                      </>
                    ),
                  },
                  {
                    title: "Named exports",
                    body: "Next.js 엔트리(page/layout/error/metadata)만 default export.",
                  },
                  {
                    title: "No hand-rolled memo",
                    body: (
                      <>
                        React Compiler 사용. <code className="font-mono text-footnote">useMemo</code> /{" "}
                        <code className="font-mono text-footnote">useCallback</code> /{" "}
                        <code className="font-mono text-footnote">React.memo</code> 금지에 가깝게.
                      </>
                    ),
                  },
                  {
                    title: "Tokens only",
                    body: (
                      <>
                        임의 px·hex 금지. 스케일은{" "}
                        <Link
                          href="/design-system"
                          className="text-core-accent-strong underline-offset-2 hover:underline">
                          /design-system
                        </Link>
                        .
                      </>
                    ),
                  },
                  {
                    title: "Bun only",
                    body: "npm / yarn / pnpm 쓰지 않음. bun.lock 커밋.",
                  },
                  {
                    title: "No drive-by docs",
                    body: "요청 없이 README·주석 추가하지 않음. 주석도 기본적으로 넣지 않음.",
                  },
                ]}
              />
            </DocSection>

            <DocSection id="stack" index={2} title="Stack" description="고정 선택. 대체 도구를 새로 들이지 않음.">
              <KeyValueList
                rows={[
                  { key: "Framework", value: "Next.js 16.3 App Router · Turbopack" },
                  { key: "UI", value: "React 19.2 + React Compiler" },
                  { key: "Language", value: "TypeScript 7 strict · @/* → ./src/*" },
                  { key: "Styling", value: "Tailwind CSS v4 · @theme CSS-first · token-only" },
                  { key: "Lint / format", value: "Biome 2.5 (no ESLint, no Prettier)" },
                  { key: "Validation", value: "Zod 4" },
                  { key: "Icons", value: "lucide-react (+ inline brand SVGs)" },
                  { key: "CMS", value: "Notion API 2025-09-03" },
                  { key: "Package manager", value: "Bun · Node ≥ 20.9" },
                  { key: "Analytics", value: "@vercel/analytics · speed-insights" },
                ]}
              />
            </DocSection>

            <DocSection
              id="commands"
              index={3}
              title="Commands"
              description="변경 완료 전 항상 lint. 프로젝트의 유일한 로컬 게이트.">
              <CodeBlock caption="package scripts">{`bun install
bun dev
bun run build
bun start
bun run lint        # biome check
bun run lint:fix   # biome check --write
bun run format      # biome format --write`}</CodeBlock>
            </DocSection>

            <DocSection
              id="structure"
              index={4}
              title="Structure"
              description="features = 페이지 전용. shared = 재사용. app = 라우트 엔트리.">
              <CodeBlock caption="src/">{TREE}</CodeBlock>
              <RuleList
                items={[
                  {
                    title: "features/sections",
                    body: "섹션마다 데이터 fetch + 에러 바운더리 소유.",
                  },
                  {
                    title: "shared/ui",
                    body: "도메인 몰라도 쓸 수 있는 프레젠테이션 프리미티브.",
                  },
                  {
                    title: "shared/lib",
                    body: "env, Notion 클라이언트, portfolio-data, errors.",
                  },
                ]}
              />
            </DocSection>

            <DocSection
              id="typescript"
              index={5}
              title="TypeScript"
              description="strict. 스키마가 타입의 정본(source of truth).">
              <KeyValueList
                rows={[
                  { key: "strict", value: "true" },
                  { key: "paths", value: '@/* → "./src/*"' },
                  { key: "Entity types", value: "z.infer from shared/schemas.ts" },
                  { key: "Re-exports", value: "shared/types.ts" },
                ]}
              />
              <Subgroup title="Imports">
                <RuleList
                  items={[
                    {
                      title: "Path alias",
                      body: (
                        <>
                          상대 경로 대신 <code className="font-mono text-footnote">@/…</code>.
                        </>
                      ),
                    },
                    {
                      title: "type imports",
                      body: (
                        <>
                          타입만 쓸 때 <code className="font-mono text-footnote">import type</code>.
                        </>
                      ),
                    },
                    {
                      title: "Organize imports",
                      body: "Biome assist가 정리. 수동 정렬 금지.",
                    },
                  ]}
                />
              </Subgroup>
            </DocSection>

            <DocSection
              id="react"
              index={6}
              title="React"
              description="RSC 기본. 클라이언트는 스크롤 관찰·토글 등 상태/브라우저 API가 필요할 때만.">
              <Subgroup title="Server vs client (today)">
                <KeyValueList
                  rows={[
                    { key: "Server", value: "sections/*, Description, pages, layout" },
                    { key: "Client", value: "nav, side-project-toggle, collapsible" },
                  ]}
                />
              </Subgroup>
              <Subgroup title="Section error pattern">
                <CodeBlock caption="features/sections/*">{SECTION_PATTERN}</CodeBlock>
                <p className="text-content-standard-tertiary text-footnote">
                  <code className="font-mono">getErrorMessage</code>는{" "}
                  <code className="font-mono">@/shared/lib/errors</code>에서 import. 로컬 재정의 금지. empty →{" "}
                  <code className="font-mono">null</code>.
                </p>
              </Subgroup>
              <Subgroup title="Images">
                <RuleList
                  items={[
                    {
                      title: "next/image",
                      body: (
                        <>
                          항상 <code className="font-mono text-footnote">width</code> /{" "}
                          <code className="font-mono text-footnote">height</code> /{" "}
                          <code className="font-mono text-footnote">sizes</code>,{" "}
                          <code className="font-mono text-footnote">draggable=&#123;false&#125;</code>. 장식 이미지는{" "}
                          <code className="font-mono text-footnote">alt=&quot;&quot;</code>.
                        </>
                      ),
                    },
                    {
                      title: "Remote hosts",
                      body: (
                        <>
                          새 호스트는 <code className="font-mono text-footnote">next.config.ts</code>의{" "}
                          <code className="font-mono text-footnote">remotePatterns</code>와 CSP{" "}
                          <code className="font-mono text-footnote">img-src</code> 둘 다.
                        </>
                      ),
                    },
                  ]}
                />
              </Subgroup>
            </DocSection>

            <DocSection
              id="format"
              index={7}
              title="Format"
              description="Biome 단일 툴체인. CSS는 Biome 제외 — globals.css는 수동 포맷.">
              <KeyValueList
                rows={[
                  { key: "indent", value: "2 spaces" },
                  { key: "lineWidth", value: "120" },
                  { key: "quotes", value: "double (JSX too)" },
                  { key: "semicolons", value: "always" },
                  { key: "trailingCommas", value: "all (JSON: none)" },
                  { key: "bracketSameLine", value: "true (JSX > on last prop line)" },
                  { key: "arrowParentheses", value: "always" },
                  { key: "lineEnding", value: "lf" },
                  { key: "useSortedClasses", value: "warn · lint:fix sorts" },
                  { key: "useArrowFunction", value: "error" },
                  { key: "noUnusedImports", value: "error" },
                ]}
              />
              <CodeBlock caption="JSX bracketSameLine">{`<Button
  text="Save"
  onClick={handleSave}
/>`}</CodeBlock>
            </DocSection>

            <DocSection id="naming" index={8} title="Naming" description="영어 식별자. 파일은 kebab-case.">
              <KeyValueList
                rows={[
                  { key: "Files", value: "kebab-case.tsx · aboutme.tsx, project-card.tsx" },
                  { key: "Components", value: "PascalCase named export · export function Chip" },
                  { key: "Hooks", value: "useActiveSection (colocate in feature file OK)" },
                  { key: "Fetchers", value: "fetchProjects, getPortfolioData" },
                  { key: "Errors", value: "DataFetchError, DataValidationError, NotionApiError" },
                  { key: "Env vars", value: "NOTION_TOKEN, *_DATA_SOURCE_ID (UUID)" },
                ]}
              />
            </DocSection>

            <DocSection
              id="styling"
              index={9}
              title="Styling"
              description="디자인 토큰만. Layer 1 --solid-* 는 globals.css 전용.">
              <RuleList
                items={[
                  {
                    title: "Semantic classes",
                    body: (
                      <>
                        <code className="font-mono text-footnote">text-content-standard-primary</code>,{" "}
                        <code className="font-mono text-footnote">p-spacing-500</code>,{" "}
                        <code className="font-mono text-footnote">rounded-radius-md</code>,{" "}
                        <code className="font-mono text-footnote">duration-fast</code>.
                      </>
                    ),
                  },
                  {
                    title: "No theme toggle",
                    body: (
                      <>
                        <code className="font-mono text-footnote">prefers-color-scheme</code> only. Providers는
                        pass-through.
                      </>
                    ),
                  },
                  {
                    title: "Motion",
                    body: "상태 변화(hover/focus/active)만. 스크롤 리빌 장식 금지. reduced-motion 존중.",
                  },
                  {
                    title: "tracking-wider",
                    body: "Tailwind 빌트인 사용 허용 (토큰 위반 아님). 커스텀 자간은 tracking-label-wide 하나.",
                  },
                  {
                    title: "Focus ring",
                    body: (
                      <>
                        <code className="font-mono text-footnote">
                          focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2
                          focus-visible:ring-offset-background-standard-primary
                        </code>
                      </>
                    ),
                  },
                ]}
              />
              <p className="text-content-standard-tertiary text-label">
                전체 스케일·컴포넌트 쇼케이스 →{" "}
                <Link href="/design-system" className="text-core-accent-strong underline-offset-2 hover:underline">
                  /design-system
                </Link>
              </p>
            </DocSection>

            <DocSection
              id="data"
              index={10}
              title="Data"
              description="Notion이 소스 오브 트루스. 요청마다 live fetch — 캐시 없음(force-dynamic + no-store).">
              <CodeBlock caption="pipeline">{`.env.local
  → env.ts (Zod at import)
  → portfolio-data.ts → notion.ts
  → schema.parse()
  → Server Component section`}</CodeBlock>
              <RuleList
                items={[
                  {
                    title: "aboutMe required",
                    body: "getPortfolioData에서 aboutMe 실패는 전파. 나머지 섹션은 []로 degrade.",
                  },
                  {
                    title: "Error kinds",
                    body: "DataFetchError (4xx → config), DataValidationError (Zod).",
                  },
                  {
                    title: "Dates",
                    body: (
                      <>
                        ISO → <code className="font-mono text-footnote">YYYY.MM</code> via formatDate / formatPeriod.
                      </>
                    ),
                  },
                  {
                    title: "No caching by design",
                    body: "신선도 트레이드오프 없이 캐시 추가하지 말 것.",
                  },
                ]}
              />
            </DocSection>

            <DocSection
              id="a11y"
              index={11}
              title="A11y & security"
              description="새 마크업은 접근 가능해야 함. CSP·보안 헤더는 next.config.ts.">
              <RuleList
                items={[
                  {
                    title: "Skip link",
                    body: (
                      <>
                        layout의 <code className="font-mono text-footnote">#main-content</code> 유지.
                      </>
                    ),
                  },
                  {
                    title: "aria-current / aria-expanded",
                    body: "네비·Collapsible 패턴 유지.",
                  },
                  {
                    title: "dangerouslySetInnerHTML",
                    body: "JSON-LD Person 스키마 한 곳만. 새로 도입 금지.",
                  },
                  {
                    title: "Secrets",
                    body: "로그·커밋에 토큰 금지. env는 Zod로 import-time 검증.",
                  },
                  {
                    title: "CSP",
                    body: "외부 script/style/font/img/connect 추가 시 해당 *-src 갱신.",
                  },
                ]}
              />
            </DocSection>
          </div>

          <div className="mt-spacing-900">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
