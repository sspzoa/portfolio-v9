import type { Metadata } from "next";
import Link from "next/link";
import {
  Callout,
  CodeBlock,
  DocSection,
  DoDont,
  INLINE_LINK_CLASSNAME,
  InlineCode,
  KeyValueList,
  RuleList,
  Subgroup,
} from "@/features/docs/primitives";
import { DocShell } from "@/features/docs/shell";

export const metadata: Metadata = {
  title: "Code Style · Seungpyo Suh",
  description:
    "Production engineering guide for sspzoa.io — architecture, TypeScript, React, data, security, and extension playbooks.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://sspzoa.io/code-style",
  },
};

const NAV = [
  { id: "principles", label: "Principles" },
  { id: "architecture", label: "Architecture" },
  { id: "stack", label: "Stack" },
  { id: "commands", label: "Commands" },
  { id: "structure", label: "Structure" },
  { id: "typescript", label: "TypeScript" },
  { id: "react", label: "React" },
  { id: "styling", label: "Styling" },
  { id: "data", label: "Data" },
  { id: "errors", label: "Errors" },
  { id: "routing", label: "Routing" },
  { id: "testing", label: "Testing" },
  { id: "git", label: "Git" },
  { id: "security", label: "Security" },
  { id: "performance", label: "Performance" },
  { id: "format", label: "Format" },
  { id: "naming", label: "Naming" },
  { id: "playbooks", label: "Playbooks" },
] as const;

const TREE = `src/
  app/                 # routes, layouts, metadata, route handlers
  features/            # product surfaces (page-level UI + workflows)
    docs/              # design-system / code-style chrome
    sections/          # portfolio async sections
  shared/
    ui/                # domain-light presentational primitives
    lib/               # env, clients, data, errors
    utils/             # pure helpers
    markdown/          # server-safe markdown-lite
    schemas.ts         # Zod + z.infer (source of truth)
    types.ts           # re-exports`;

const BOUNDARIES = `app        → features, shared
features   → shared  (not other features unless intentional)
shared/ui  → shared/utils, shared/markdown  (no features, no app)
shared/lib → shared/schemas, shared/utils   (no React UI)
shared/*   ✗  import from app/ or features/`;

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

const ROUTE_HANDLER = `export async function GET() {
  try {
    const body = await buildPayload();
    return new Response(body, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[route]", error);
    return new Response("Unavailable", { status: 503 });
  }
}`;

const FEATURE_PLAYBOOK = `1. features/<name>/  or app/<route>/page.tsx
2. Compose shared/ui + shared/lib — do not fork tokens
3. Server Component by default; client leaf only if needed
4. Zod at the boundary for external input
5. Error UI via getErrorMessage / route status — no raw stacks
6. Update /design-system or /code-style if contracts change
7. bun run lint && bun run build`;

const COMPONENT_PLAYBOOK = `1. shared/ui/kebab-name.tsx · named export
2. Tokens only · FOCUS_RING pattern for controls
3. Props table + live demo on /design-system
4. No domain types unless composite is explicitly domain-bound
5. Prefer composition over variant explosion`;

export default function CodeStylePage() {
  return (
    <DocShell
      subtitle="Code Style"
      title={
        <>
          Code<span className="text-core-accent">.</span>
        </>
      }
      lead={
        <>
          sspzoa.io 프로덕션 엔지니어링 가이드. 포트폴리오를 넘어 기능·라우트·데이터 경계를 확장할 때 같은 결정을
          반복하지 않도록 고정합니다. UI 카피는 한국어(<InlineCode>lang=&quot;ko&quot;</InlineCode>), 식별자·커밋·코드는
          영어. 게이트는 <InlineCode>bun run lint</InlineCode>. 비주얼 토큰은{" "}
          <Link href="/design-system" className={INLINE_LINK_CLASSNAME}>
            Design System
          </Link>
          .
        </>
      }
      nav={NAV}>
      <DocSection
        id="principles"
        index={1}
        title="Principles"
        description="에이전트·기여자·미래의 제품 표면이 공유하는 불변 규칙.">
        <RuleList
          items={[
            {
              title: "Server by default",
              body: (
                <>
                  인터랙션·브라우저 API가 필요할 때만 <InlineCode>&quot;use client&quot;</InlineCode>. 클라이언트 경계를
                  잎(leaf)에 붙인다.
                </>
              ),
            },
            {
              title: "Named exports",
              body: "Next.js 엔트리(page/layout/error/metadata/route)만 default export.",
            },
            {
              title: "Schema is truth",
              body: (
                <>
                  외부 입력·CMS·env는 Zod. 타입은 <InlineCode>z.infer</InlineCode>. 손 타입 복제 금지.
                </>
              ),
            },
            {
              title: "No hand-rolled memo",
              body: (
                <>
                  React Compiler. <InlineCode>useMemo</InlineCode> / <InlineCode>useCallback</InlineCode> /{" "}
                  <InlineCode>React.memo</InlineCode> 금지에 가깝게.
                </>
              ),
            },
            {
              title: "Tokens only",
              body: (
                <>
                  임의 px·hex 금지.{" "}
                  <Link href="/design-system" className={INLINE_LINK_CLASSNAME}>
                    /design-system
                  </Link>
                  .
                </>
              ),
            },
            {
              title: "Bun only",
              body: "npm / yarn / pnpm 금지. bun.lock 커밋.",
            },
            {
              title: "Fail closed on secrets",
              body: "env 검증 실패는 프로세스/요청 실패. 기본값으로 조용히 진행 금지.",
            },
            {
              title: "No drive-by docs",
              body: "요청 없는 README·주석 추가 금지. 계약 변경 시 AGENTS + 이 페이지 + design-system 동기화.",
            },
          ]}
        />
        <DoDont
          doItems={[
            "경계를 좁히고 조합으로 확장",
            "에러를 종류별로 모델링 (fetch / validation / config)",
            "린트·빌드를 완료 조건으로 취급",
          ]}
          dontItems={[
            "features ↔ features 임의 교차 import 남발",
            "shared/ui에 페이지 라우팅·fetch 넣기",
            "캐시/토큰/CSP를 문서 없이 변경",
          ]}
        />
      </DocSection>

      <DocSection
        id="architecture"
        index={2}
        title="Architecture"
        description="확장 가능한 레이어. 의존성은 항상 안쪽(shared)으로만 흐른다.">
        <CodeBlock caption="import boundaries">{BOUNDARIES}</CodeBlock>
        <KeyValueList
          rows={[
            { key: "app", value: "routing, metadata, composition roots" },
            { key: "features", value: "product surfaces · may own local state & fetch orchestration" },
            { key: "shared/ui", value: "presentational · reusable · domain-light" },
            { key: "shared/lib", value: "IO, env, clients, pure domain services" },
            { key: "shared/schemas", value: "validation + types" },
          ]}
        />
        <Callout tone="note" title="Portfolio as one surface">
          홈 이력서는 <InlineCode>features/sections/*</InlineCode> 표면이다. 새 제품 표면(대시보드, 설정, 내부 툴)도
          같은 레이어 규칙을 쓴다. Notion 파이프라인은 데이터 어댑터일 뿐 아키텍처 중심이 아니다.
        </Callout>
      </DocSection>

      <DocSection id="stack" index={3} title="Stack" description="고정 선택. 대체 도구 도입 시 문서·근거 필수.">
        <KeyValueList
          rows={[
            { key: "Framework", value: "Next.js 16.3 App Router · Turbopack" },
            { key: "UI", value: "React 19.2 + React Compiler" },
            { key: "Language", value: "TypeScript 7 strict · @/* → ./src/*" },
            { key: "Styling", value: "Tailwind CSS v4 · @theme CSS-first · token-only" },
            { key: "Lint / format", value: "Biome 2.5 (no ESLint, no Prettier)" },
            { key: "Validation", value: "Zod 4" },
            { key: "Icons", value: "lucide-react (+ inline brand SVGs)" },
            { key: "CMS (portfolio)", value: "Notion API 2025-09-03" },
            { key: "Package manager", value: "Bun · Node ≥ 20.9" },
            { key: "Analytics", value: "@vercel/analytics · speed-insights" },
            { key: "Deploy", value: "Vercel" },
          ]}
        />
      </DocSection>

      <DocSection
        id="commands"
        index={4}
        title="Commands"
        description="변경 완료 전 항상 lint. 유일 로컬 게이트. build는 배포 전 검증.">
        <CodeBlock caption="package scripts">{`bun install
bun dev
bun run build
bun start
bun run lint        # biome check
bun run lint:fix   # biome check --write
bun run format      # biome format --write`}</CodeBlock>
        <RuleList
          items={[
            {
              title: "Done means",
              body: (
                <>
                  <InlineCode>bun run lint</InlineCode> clean. 타입/라우트 변경 시{" "}
                  <InlineCode>bun run build</InlineCode> 권장.
                </>
              ),
            },
            {
              title: "Unsafe class sort",
              body: (
                <>
                  <InlineCode>useSortedClasses</InlineCode> warn · <InlineCode>biome check --write --unsafe</InlineCode>
                  로 정렬.
                </>
              ),
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="structure"
        index={5}
        title="Structure"
        description="features = 제품 표면. shared = 재사용. app = 라우트 엔트리.">
        <CodeBlock caption="src/">{TREE}</CodeBlock>
        <RuleList
          items={[
            {
              title: "features/*",
              body: "페이지·워크플로 단위. 섹션 fetch, 네비, docs shell 등.",
            },
            {
              title: "shared/ui",
              body: "도메인 몰라도 쓸 수 있는 프리미티브. ProjectCard 같은 도메인 결합은 예외로 명시.",
            },
            {
              title: "shared/lib",
              body: "env, HTTP/Notion 클라이언트, portfolio-data, errors — UI 금지.",
            },
            {
              title: "Colocation",
              body: "한 표면에만 쓰이는 헬로는 feature 폴더에. 2+ 표면이면 shared로 승격.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="typescript"
        index={6}
        title="TypeScript"
        description="strict. 스키마가 타입의 정본. any 탈출구를 기본 경로로 쓰지 않음.">
        <KeyValueList
          rows={[
            { key: "strict", value: "true" },
            { key: "paths", value: '@/* → "./src/*"' },
            { key: "Entity types", value: "z.infer from shared/schemas.ts" },
            { key: "Re-exports", value: "shared/types.ts" },
            { key: "target", value: "ES2022 · moduleResolution bundler" },
          ]}
        />
        <Subgroup title="Imports">
          <RuleList
            items={[
              {
                title: "Path alias",
                body: (
                  <>
                    상대 경로 대신 <InlineCode>@/…</InlineCode>.
                  </>
                ),
              },
              {
                title: "type imports",
                body: (
                  <>
                    타입만 쓸 때 <InlineCode>import type</InlineCode>.
                  </>
                ),
              },
              {
                title: "Organize imports",
                body: "Biome assist. 수동 정렬 금지.",
              },
            ]}
          />
        </Subgroup>
        <Subgroup title="Contracts">
          <RuleList
            items={[
              {
                title: "Public props",
                body: "export interface/type 또는 인라인 객체 타입. 과도한 제네릭 지양.",
              },
              {
                title: "Discriminated unions",
                body: "상태/결과 타입은 유니온 + kind/tag. boolean 플래그 남발 금지.",
              },
              {
                title: "Satisfy over cast",
                body: (
                  <>
                    <InlineCode>as</InlineCode> 남용 금지. 스키마 parse가 경계.
                  </>
                ),
              },
            ]}
          />
        </Subgroup>
      </DocSection>

      <DocSection
        id="react"
        index={7}
        title="React"
        description="RSC 기본. 클라이언트는 관찰·토글·브라우저 API가 필요할 때만.">
        <Subgroup title="Server vs client (current map)">
          <KeyValueList
            rows={[
              { key: "Server", value: "pages, layout, sections/*, Description, docs pages" },
              { key: "Client", value: "nav, side-project-toggle, collapsible" },
            ]}
          />
        </Subgroup>
        <Subgroup title="Rules">
          <RuleList
            items={[
              {
                title: "Push client down",
                body: "트리를 통째로 client로 올리지 말 것. 상호작용 잎만.",
              },
              {
                title: "No memo library",
                body: "Compiler에 맡김. 의존성 배열 미세 최적화 금지.",
              },
              {
                title: "Keys",
                body: "안정 id. 배열 index key 지양(정적 리스트 예외).",
              },
              {
                title: "Effects",
                body: "구독·DOM 측정만. 데이터 fetch는 서버/route에서.",
              },
            ]}
          />
        </Subgroup>
        <Subgroup title="Images">
          <RuleList
            items={[
              {
                title: "next/image",
                body: (
                  <>
                    항상 <InlineCode>width</InlineCode> / <InlineCode>height</InlineCode> /{" "}
                    <InlineCode>sizes</InlineCode>, <InlineCode>{"draggable={false}"}</InlineCode>. 장식{" "}
                    <InlineCode>alt=&quot;&quot;</InlineCode>.
                  </>
                ),
              },
              {
                title: "Remote hosts",
                body: (
                  <>
                    <InlineCode>remotePatterns</InlineCode> + CSP <InlineCode>img-src</InlineCode> 동시 갱신.
                  </>
                ),
              },
            ]}
          />
        </Subgroup>
      </DocSection>

      <DocSection
        id="styling"
        index={8}
        title="Styling"
        description="디자인 토큰만. Layer 1 --solid-* 는 globals.css 전용. 상세 스케일 → /design-system.">
        <RuleList
          items={[
            {
              title: "Semantic classes",
              body: (
                <>
                  <InlineCode>text-content-standard-primary</InlineCode>, <InlineCode>p-spacing-500</InlineCode>,{" "}
                  <InlineCode>rounded-radius-md</InlineCode>, <InlineCode>shadow-elevation-2</InlineCode>,{" "}
                  <InlineCode>z-sticky</InlineCode>.
                </>
              ),
            },
            {
              title: "No theme toggle",
              body: (
                <>
                  <InlineCode>prefers-color-scheme</InlineCode> only. Providers pass-through.
                </>
              ),
            },
            {
              title: "Motion",
              body: "상태 변화만. 스크롤 리빌 금지. reduced-motion 존중.",
            },
            {
              title: "Status colors",
              body: (
                <>
                  피드백은 <InlineCode>status-*</InlineCode>. 장식 팔레트로 남용 금지.
                </>
              ),
            },
            {
              title: "Focus ring",
              body: (
                <>
                  <InlineCode>features/docs/primitives</InlineCode>의 <InlineCode>FOCUS_RING</InlineCode> 재사용.
                </>
              ),
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="data"
        index={9}
        title="Data"
        description="외부 IO는 어댑터 뒤에. 포트폴리오는 Notion live fetch — 캐시 없음(force-dynamic + no-store).">
        <CodeBlock caption="portfolio pipeline">{`.env.local
  → env.ts (Zod at import) + DATA_SOURCE_IDS
  → portfolio-data.ts → notion.ts
  → schema.parse()
  → Server Component / markdown export`}</CodeBlock>
        <RuleList
          items={[
            {
              title: "Boundary parse",
              body: "네트워크 응답은 즉시 Zod. 신뢰 데이터로 승격 후에만 UI로.",
            },
            {
              title: "aboutMe required",
              body: "getPortfolioData에서 aboutMe 실패는 전파. 나머지 섹션 [] degrade.",
            },
            {
              title: "Timeouts & retries",
              body: "notionRequest: 15s abort, 3× exponential backoff on 5xx/429/network.",
            },
            {
              title: "Dates",
              body: (
                <>
                  ISO → <InlineCode>YYYY.MM</InlineCode> via formatDate / formatPeriod.
                </>
              ),
            },
            {
              title: "No caching by design (portfolio)",
              body: "신선도 우선. 캐시 도입 시 freshness 정책 문서화 필수.",
            },
            {
              title: "Future adapters",
              body: "REST/GraphQL도 lib/* 클라이언트 + schema 경계 동일. UI에서 fetch 금지.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="errors" index={10} title="Errors" description="종류를 나누고 사용자 카피와 로그를 분리한다.">
        <KeyValueList
          rows={[
            { key: "NotionApiError", value: "upstream HTTP / network" },
            { key: "DataFetchError", value: "fetch failed · 4xx → config via isConfigError()" },
            { key: "DataValidationError", value: "Zod parse failure" },
            { key: "getErrorMessage", value: "shared Korean UI copy · never redefine locally" },
          ]}
        />
        <Subgroup title="Section pattern">
          <CodeBlock caption="features/sections/*">{SECTION_PATTERN}</CodeBlock>
        </Subgroup>
        <Subgroup title="Route handlers">
          <CodeBlock caption="app/**/route.ts">{ROUTE_HANDLER}</CodeBlock>
        </Subgroup>
        <RuleList
          items={[
            {
              title: "Log server-side",
              body: (
                <>
                  <InlineCode>console.error(&quot;[Scope]&quot;, error)</InlineCode>. 클라이언트에 스택/토큰 금지.
                </>
              ),
            },
            {
              title: "Empty vs error",
              body: (
                <>
                  빈 목록 <InlineCode>null</InlineCode> (섹션 숨김). 실패는 에러 카피 노출.
                </>
              ),
            },
            {
              title: "error.tsx / global-error",
              body: "라우트 세그먼트 복구 UI 유지. 사용자 언어 한국어.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="routing"
        index={11}
        title="Routing & metadata"
        description="App Router 관례. 인덱싱·canonical·alternate types를 라우트와 함께 정의.">
        <KeyValueList
          rows={[
            { key: "/", value: "portfolio · force-dynamic" },
            { key: "/design-system", value: "docs · static OK · indexed" },
            { key: "/code-style", value: "docs · static OK · indexed" },
            { key: "/machine-readable", value: "markdown view · force-dynamic" },
            { key: "/llms.txt · /llms-full.txt", value: "route handlers · text/plain|markdown" },
            { key: "/portfolio", value: "permanent redirect → /" },
          ]}
        />
        <RuleList
          items={[
            {
              title: "metadata export",
              body: "title, description, canonical, robots per page.",
            },
            {
              title: "sitemap / robots",
              body: "공개 라우트 추가 시 sitemap.ts 갱신.",
            },
            {
              title: "Shell pages",
              body: (
                <>
                  docs는 <InlineCode>DocShell</InlineCode> 사용 — 사이드바·모바일 헤더·footer 일관.
                </>
              ),
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="testing"
        index={12}
        title="Testing"
        description="현재 자동 테스트 스위트는 최소. 확장을 위한 계약.">
        <RuleList
          items={[
            {
              title: "Gate today",
              body: (
                <>
                  <InlineCode>bun run lint</InlineCode> + 필요 시 <InlineCode>bun run build</InlineCode>.
                </>
              ),
            },
            {
              title: "When adding tests",
              body: "순수 함수(utils/schemas) 단위 → 데이터 매퍼 → 크리티컬 route handler 순.",
            },
            {
              title: "No flaky UI snapshots first",
              body: "토큰/레이아웃은 design-system 페이지가 리뷰 기준. 스냅샷은 회귀 핫스팟만.",
            },
            {
              title: "Manual a11y",
              body: "키보드 탭 순서, focus ring, 스크린 리더 이름 — 인터랙션 PR마다.",
            },
          ]}
        />
      </DocSection>

      <DocSection id="git" index={13} title="Git" description="히스토리는 제품 결정의 일부.">
        <RuleList
          items={[
            {
              title: "Commits",
              body: "영어. imperative. 범위가 드러나게 (feat/fix/chore/docs).",
            },
            {
              title: "Scope",
              body: "한 커밋 = 한 의도. 포맷-only와 로직 혼합 금지.",
            },
            {
              title: "Secrets",
              body: ".env.local 커밋 금지. 토큰 회전 시 히스토리 점검.",
            },
            {
              title: "Lockfile",
              body: "bun.lock 항상 함께 커밋.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="security"
        index={14}
        title="Security"
        description="CSP·헤더·시크릿. 새 외부 의존성은 허용 목록 갱신과 세트.">
        <RuleList
          items={[
            {
              title: "CSP",
              body: (
                <>
                  <InlineCode>next.config.ts</InlineCode> strict. script/style/font/img/connect 추가 시 해당 *-src.
                </>
              ),
            },
            {
              title: "Headers",
              body: "HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy 유지.",
            },
            {
              title: "dangerouslySetInnerHTML",
              body: "JSON-LD Person 한 곳만. 신규 도입 금지(필요 시 sanitize + 문서화).",
            },
            {
              title: "Env",
              body: (
                <>
                  import-time Zod. <InlineCode>NOTION_TOKEN</InlineCode> 형태 검증. 로그 출력 금지.
                </>
              ),
            },
            {
              title: "Dependencies",
              body: "최소 의존. 새 패키지는 목적·대안·라이선스 검토 후.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="performance"
        index={15}
        title="Performance"
        description="RSC·적은 클라이언트 JS·토큰화된 CSS가 기본 전략.">
        <RuleList
          items={[
            {
              title: "JS budget",
              body: "client 컴포넌트 수·크기를 의식. 네비/토글 외 상태 최소화.",
            },
            {
              title: "Images",
              body: "sizes 정확히. 장식 이미지 lazy 기본. unoptimized 설정 인지.",
            },
            {
              title: "Fonts",
              body: "Wanted Sans variable split. 추가 웹폰트는 성능 근거 필요.",
            },
            {
              title: "No scroll thrash",
              body: "IntersectionObserver는 nav 한 곳. 전역 scroll listener 남발 금지.",
            },
            {
              title: "Streaming",
              body: "섹션 단위 async SC로 자연 스트리밍. 불필요한 suspense 경계 남발 금지.",
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="format"
        index={16}
        title="Format"
        description="Biome 단일 툴체인. CSS는 Biome 제외 — globals.css 수동 포맷.">
        <KeyValueList
          rows={[
            { key: "indent", value: "2 spaces" },
            { key: "lineWidth", value: "120" },
            { key: "quotes", value: "double (JSX too)" },
            { key: "semicolons", value: "always" },
            { key: "trailingCommas", value: "all (JSON: none)" },
            { key: "bracketSameLine", value: "true" },
            { key: "arrowParentheses", value: "always" },
            { key: "lineEnding", value: "lf" },
            { key: "preset", value: "recommended" },
            { key: "useSortedClasses", value: "warn · unsafe fix sorts" },
            { key: "useArrowFunction", value: "error" },
            { key: "noUnusedImports", value: "error" },
          ]}
        />
        <CodeBlock caption="JSX bracketSameLine">{`<Button
  text="Save"
  onClick={handleSave}
/>`}</CodeBlock>
      </DocSection>

      <DocSection id="naming" index={17} title="Naming" description="영어 식별자. 파일은 kebab-case.">
        <KeyValueList
          rows={[
            { key: "Files", value: "kebab-case.tsx · project-card.tsx, portfolio-data.ts" },
            { key: "Components", value: "PascalCase named export · export function Chip" },
            { key: "Hooks", value: "useActiveSection (colocate OK)" },
            { key: "Fetchers", value: "fetchProjects, getPortfolioData" },
            { key: "Errors", value: "DataFetchError, DataValidationError, NotionApiError" },
            { key: "Env", value: "NOTION_TOKEN · DATA_SOURCE_IDS in code" },
            { key: "CSS tokens", value: "semantic role names · not brand-blue-500 in UI" },
            { key: "Commits", value: "feat: · fix: · chore: · docs:" },
          ]}
        />
      </DocSection>

      <DocSection
        id="playbooks"
        index={18}
        title="Playbooks"
        description="반복 작업 체크리스트. 새 기여자·에이전트 진입점.">
        <Subgroup title="New feature / surface">
          <CodeBlock>{FEATURE_PLAYBOOK}</CodeBlock>
        </Subgroup>
        <Subgroup title="New UI primitive">
          <CodeBlock>{COMPONENT_PLAYBOOK}</CodeBlock>
        </Subgroup>
        <Subgroup title="New portfolio section">
          <RuleList
            items={[
              {
                title: "Data source",
                body: (
                  <>
                    <InlineCode>DATA_SOURCE_IDS</InlineCode>에 ID 하드코드.
                  </>
                ),
              },
              {
                title: "Types",
                body: "notion-types → schemas → portfolio-data fetch → markdown export.",
              },
              {
                title: "UI",
                body: (
                  <>
                    <InlineCode>features/sections/*</InlineCode> + error pattern + <InlineCode>SECTIONS</InlineCode>{" "}
                    등록.
                  </>
                ),
              },
              {
                title: "Order",
                body: "home SECTIONS 순서 = markdown export 순서.",
              },
            ]}
          />
        </Subgroup>
        <Subgroup title="Convention change">
          <RuleList
            items={[
              {
                title: "Triple sync",
                body: (
                  <>
                    <InlineCode>AGENTS.md</InlineCode> · <InlineCode>/code-style</InlineCode> ·{" "}
                    <InlineCode>/design-system</InlineCode>
                  </>
                ),
              },
              {
                title: "No silent drift",
                body: "한 문서만 고치지 말 것.",
              },
            ]}
          />
        </Subgroup>
      </DocSection>
    </DocShell>
  );
}
