import type { Metadata } from "next";
import Link from "next/link";
import {
  Callout,
  CodeBlock,
  DocSection,
  DoDont,
  FOCUS_RING,
  INLINE_LINK_CLASSNAME,
  InlineCode,
  KeyValueList,
  PropsTable,
  RuleList,
  Subgroup,
  SwatchGrid,
  TextSwatchList,
  TokenRow,
} from "@/features/docs/primitives";
import { DocShell } from "@/features/docs/shell";
import { Button } from "@/shared/ui/button";
import { Chip } from "@/shared/ui/chip";
import { Collapsible } from "@/shared/ui/collapsible";
import { Description } from "@/shared/ui/description";
import { RecordGroup } from "@/shared/ui/record-group";
import { RecordRow } from "@/shared/ui/record-row";
import { Section } from "@/shared/ui/section";
import { Tag } from "@/shared/ui/tag";
import { TimelineEntry } from "@/shared/ui/timeline-entry";

export const metadata: Metadata = {
  title: "Design System · Seungpyo Suh",
  description:
    "Production design system for sspzoa.io — token architecture, foundations, patterns, and shared UI primitives.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://sspzoa.io/design-system",
  },
};

const NAV = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "elevation", label: "Elevation" },
  { id: "z-index", label: "Z-index" },
  { id: "motion", label: "Motion" },
  { id: "layout", label: "Layout" },
  { id: "iconography", label: "Iconography" },
  { id: "patterns", label: "Patterns" },
  { id: "components", label: "Components" },
  { id: "accessibility", label: "Accessibility" },
  { id: "extension", label: "Extension" },
] as const;

const CONTENT_STANDARD = [
  { token: "content-standard-primary", className: "text-content-standard-primary" },
  { token: "content-standard-secondary", className: "text-content-standard-secondary" },
  { token: "content-standard-tertiary", className: "text-content-standard-tertiary" },
  { token: "content-standard-quaternary", className: "text-content-standard-quaternary" },
] as const;

const CONTENT_INVERTED = [
  { token: "content-inverted-primary", className: "text-content-inverted-primary" },
  { token: "content-inverted-secondary", className: "text-content-inverted-secondary" },
  { token: "content-inverted-tertiary", className: "text-content-inverted-tertiary" },
  { token: "content-inverted-quaternary", className: "text-content-inverted-quaternary" },
] as const;

const BACKGROUNDS = [
  { token: "background-standard-primary", className: "bg-background-standard-primary" },
  { token: "background-standard-secondary", className: "bg-background-standard-secondary" },
  { token: "background-inverted-primary", className: "bg-background-inverted-primary" },
  { token: "background-inverted-secondary", className: "bg-background-inverted-secondary" },
] as const;

const FILLS_STANDARD = [
  { token: "components-fill-standard-primary", className: "bg-components-fill-standard-primary" },
  { token: "components-fill-standard-secondary", className: "bg-components-fill-standard-secondary" },
  { token: "components-fill-standard-tertiary", className: "bg-components-fill-standard-tertiary" },
] as const;

const FILLS_INVERTED = [
  { token: "components-fill-inverted-primary", className: "bg-components-fill-inverted-primary" },
  { token: "components-fill-inverted-secondary", className: "bg-components-fill-inverted-secondary" },
  { token: "components-fill-inverted-tertiary", className: "bg-components-fill-inverted-tertiary" },
] as const;

const INTERACTIVE = [
  { token: "components-interactive-hover", className: "bg-components-interactive-hover" },
  { token: "components-interactive-focused", className: "bg-components-interactive-focused" },
  { token: "components-interactive-pressed", className: "bg-components-interactive-pressed" },
] as const;

const TRANSLUCENT = [
  { token: "components-translucent-primary", className: "bg-components-translucent-primary" },
  { token: "components-translucent-secondary", className: "bg-components-translucent-secondary" },
  { token: "components-translucent-tertiary", className: "bg-components-translucent-tertiary" },
] as const;

const CORE = [
  { token: "core-accent", className: "bg-core-accent" },
  { token: "core-accent-strong", className: "bg-core-accent-strong" },
  { token: "core-accent-translucent", className: "bg-core-accent-translucent" },
] as const;

const STATUS = [
  { token: "status-success", className: "bg-status-success" },
  { token: "status-warning", className: "bg-status-warning" },
  { token: "status-danger", className: "bg-status-danger" },
  { token: "status-info", className: "bg-status-info" },
] as const;

const STATUS_TRANSLUCENT = [
  { token: "status-success-translucent", className: "bg-status-success-translucent" },
  { token: "status-warning-translucent", className: "bg-status-warning-translucent" },
  { token: "status-danger-translucent", className: "bg-status-danger-translucent" },
  { token: "status-info-translucent", className: "bg-status-info-translucent" },
] as const;

const LINES = [
  { token: "line-divider", className: "bg-line-divider" },
  { token: "line-outline", className: "bg-line-outline" },
] as const;

const TYPE_SCALE = [
  {
    token: "hero",
    className: "text-hero font-semibold tracking-tight",
    sample: "Hero",
    meta: "clamp(2.75rem, 2rem + 4vw, 4.5rem) · lh 1.02 · page titles only",
  },
  {
    token: "title",
    className: "text-title font-semibold tracking-tight",
    sample: "Title",
    meta: "24 / 34 · section headers",
  },
  {
    token: "heading",
    className: "text-heading font-semibold tracking-tight",
    sample: "Heading",
    meta: "20 / 28 · card / entry titles",
  },
  {
    token: "body",
    className: "text-body",
    sample: "Body — 본문 문단. 한국어 가독성에 맞춘 줄간격.",
    meta: "16 / 27 · long-form reading",
  },
  {
    token: "label",
    className: "text-label",
    sample: "Label — 보조 설명, 메타 문장, UI 카피",
    meta: "14 / 22 · default UI text",
  },
  {
    token: "footnote",
    className: "text-footnote font-mono uppercase tracking-wider",
    sample: "Footnote",
    meta: "12 / 18 · chrome, indices, mono labels",
  },
] as const;

const SPACING = [
  { token: "spacing-50", px: "2px", className: "w-spacing-50" },
  { token: "spacing-100", px: "4px", className: "w-spacing-100" },
  { token: "spacing-150", px: "6px", className: "w-spacing-150" },
  { token: "spacing-200", px: "8px", className: "w-spacing-200" },
  { token: "spacing-300", px: "12px", className: "w-spacing-300" },
  { token: "spacing-400", px: "16px", className: "w-spacing-400" },
  { token: "spacing-500", px: "20px", className: "w-spacing-500" },
  { token: "spacing-550", px: "24px", className: "w-spacing-550" },
  { token: "spacing-600", px: "28px", className: "w-spacing-600" },
  { token: "spacing-700", px: "32px", className: "w-spacing-700" },
  { token: "spacing-750", px: "36px", className: "w-spacing-750" },
  { token: "spacing-800", px: "40px", className: "w-spacing-800" },
  { token: "spacing-850", px: "48px", className: "w-spacing-850" },
  { token: "spacing-900", px: "64px", className: "w-spacing-900" },
  { token: "spacing-950", px: "72px", className: "w-spacing-950" },
  { token: "spacing-1000", px: "80px", className: "w-spacing-1000" },
] as const;

const RADII = [
  { token: "radius-sm", px: "6px", className: "rounded-radius-sm", use: "chips, small controls, focus corners" },
  { token: "radius-md", px: "12px", className: "rounded-radius-md", use: "cards, panels, code blocks" },
  { token: "radius-lg", px: "20px", className: "rounded-radius-lg", use: "large surfaces, hero media" },
  { token: "radius-full", px: "9999px", className: "rounded-radius-full", use: "pills, avatars" },
] as const;

const ELEVATIONS = [
  { token: "shadow-elevation-1", value: "resting card / sticky bar whisper", className: "shadow-elevation-1" },
  { token: "shadow-elevation-2", value: "dropdown / popover", className: "shadow-elevation-2" },
  { token: "shadow-elevation-3", value: "modal / important overlay", className: "shadow-elevation-3" },
] as const;

const Z_INDEX = [
  { token: "z-base", value: "0", use: "default flow" },
  { token: "z-raised", value: "10", use: "local stacking (badges on media)" },
  { token: "z-sticky", value: "40", use: "sticky headers / mobile nav" },
  { token: "z-overlay", value: "50", use: "scrims, drawers" },
  { token: "z-modal", value: "60", use: "dialogs" },
  { token: "z-toast", value: "70", use: "toasts, global alerts" },
] as const;

const MOTION = [
  { token: "duration-fast", value: "150ms", use: "color, opacity, hairline controls" },
  { token: "duration-base", value: "250ms", use: "default transitions" },
  { token: "duration-slow", value: "400ms", use: "media transform, large surfaces" },
  { token: "ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)", use: "all product motion" },
] as const;

const BREAKPOINTS = [
  { token: "default", value: "0+", use: "single column, mobile chrome" },
  { token: "sm", value: "640px", use: "2-up swatches, denser grids" },
  { token: "md", value: "768px", use: "timeline columns, reading padding" },
  { token: "lg", value: "1024px", use: "sticky sidebar shell" },
] as const;

const ICONS = [
  { token: "icon-sm / size-icon-sm", value: "14px", use: "inline with label text" },
  { token: "icon-md / size-icon-md", value: "18px", use: "social, toolbar defaults" },
  { token: "icon-lg / size-icon-lg", value: "24px", use: "empty states, feature marks" },
] as const;

const LONG_MARKDOWN = `포트폴리오 본문은 Notion CMS에서 내려오며, **볼드**와 [링크](https://sspzoa.io)를 지원합니다.

- 리스트 항목 하나
- 리스트 항목 둘
- 리스트 항목 셋

Collapsible은 높이가 maxHeight를 넘을 때만 더보기/접기 토글을 노출합니다.`;

const ADD_TOKEN = `/* 1. Layer 2 semantic var in :root (+ dark override) */
--status-new: …;

/* 2. Expose in @theme — never Layer 1 --solid-* */
--color-status-new: var(--status-new);

/* 3. Document here + AGENTS.md + /code-style */`;

export default function DesignSystemPage() {
  return (
    <DocShell
      subtitle="Design System"
      title={
        <>
          Design<span className="text-core-accent">.</span>
        </>
      }
      lead={
        <>
          sspzoa.io의 프로덕션 디자인 시스템. 토큰·패턴·프리미티브를 포트폴리오 밖으로 확장할 수 있도록 정의합니다.
          Layer 2 semantic만 컴포넌트에서 사용하고, Layer 1 <InlineCode>--solid-*</InlineCode> 원시값은 CSS에서만
          참조합니다. 엔지니어링 규칙은{" "}
          <Link href="/code-style" className={INLINE_LINK_CLASSNAME}>
            Code Style
          </Link>
          .
        </>
      }
      nav={NAV}>
      <DocSection
        id="overview"
        index={1}
        title="Overview"
        description="에디토리얼 제품 톤. 장식용 스크롤 리빌 없이, 상태 변화와 정보 구조로 계층을 만듭니다.">
        <RuleList
          items={[
            {
              title: "Tokens only",
              body: "간격·색·반경·타이포·모션·고도·z-index·아이콘 크기는 스케일에서만.",
            },
            {
              title: "Semantic over primitive",
              body: (
                <>
                  Tailwind <InlineCode>@theme</InlineCode>에는 Layer 2만. <InlineCode>--solid-*</InlineCode> 직접 사용
                  금지.
                </>
              ),
            },
            {
              title: "Composable primitives",
              body: (
                <>
                  <InlineCode>shared/ui</InlineCode>는 도메인 몰라도 조립 가능. 도메인 컴포지트는 features에.
                </>
              ),
            },
            {
              title: "One source of truth",
              body: (
                <>
                  시각 규칙 변경 시 <InlineCode>globals.css</InlineCode> → 이 페이지 →{" "}
                  <InlineCode>AGENTS.md</InlineCode> 순으로 동기화.
                </>
              ),
            },
            {
              title: "a11y by default",
              body: (
                <>
                  skip link, <InlineCode>focus-visible</InlineCode> 링, <InlineCode>prefers-reduced-motion</InlineCode>{" "}
                  존중.
                </>
              ),
            },
          ]}
        />
        <DoDont
          doItems={[
            "역할 기반 토큰 선택 (content-secondary, status-danger)",
            "새 UI는 기존 프리미티브 조합으로 시작",
            "light/dark 대비를 토큰 쌍으로 검증",
          ]}
          dontItems={[
            "컴포넌트에 hex / 임의 px / raw rgba",
            "스크롤 리빌·장식 애니메이션 추가",
            "브랜드 컬러를 accent 없이 하드코딩",
          ]}
        />
      </DocSection>

      <DocSection
        id="architecture"
        index={2}
        title="Architecture"
        description="3-layer 토큰 모델. 제품이 커져도 원시 팔레트와 시맨틱 역할을 분리합니다.">
        <KeyValueList
          rows={[
            { key: "Layer 1 · Primitive", value: "--solid-* 만 globals.css :root (컴포넌트 금지)" },
            { key: "Layer 2 · Semantic", value: "--background-*, --content-*, --status-*, …" },
            { key: "Layer 3 · Component", value: "shared/ui 내부 조합 · 페이지에 raw token 남발 금지" },
            { key: "Theme mode", value: "prefers-color-scheme only · no JS theme state" },
            { key: "Delivery", value: "Tailwind v4 @theme CSS-first · @tailwindcss/postcss" },
          ]}
        />
        <CodeBlock caption="resolution">{`Component class
  → @theme utility (--color-*, --spacing-*, …)
  → Layer 2 CSS var
  → (optional) Layer 1 primitive
  → light/dark override on :root`}</CodeBlock>
        <Callout tone="note" title="Portfolio today vs product tomorrow">
          홈은 이력서 레이아웃이지만 토큰·패턴은 앱 셸, 폼, 피드백, 오버레이까지 확장 가능하도록 정의되어 있습니다.
          미사용 토큰(status, elevation, z-*)도 스케일에 포함해 새 화면이 임의 값을 발명하지 않게 합니다.
        </Callout>
      </DocSection>

      <DocSection
        id="color"
        index={3}
        title="Color"
        description="시맨틱 색. light/dark는 CSS 변수 오버라이드로 자동 전환됩니다.">
        <Subgroup title="Content · standard">
          <TextSwatchList items={CONTENT_STANDARD} />
        </Subgroup>
        <Subgroup title="Content · inverted">
          <div className="rounded-radius-md bg-background-inverted-primary p-spacing-500">
            <TextSwatchList items={CONTENT_INVERTED} />
          </div>
        </Subgroup>
        <Subgroup title="Background">
          <SwatchGrid items={BACKGROUNDS} />
        </Subgroup>
        <Subgroup title="Components · fill standard">
          <SwatchGrid items={FILLS_STANDARD} />
        </Subgroup>
        <Subgroup title="Components · fill inverted">
          <div className="rounded-radius-md bg-background-inverted-primary p-spacing-400">
            <SwatchGrid items={FILLS_INVERTED} inverted />
          </div>
        </Subgroup>
        <Subgroup title="Components · interactive">
          <SwatchGrid items={INTERACTIVE} />
        </Subgroup>
        <Subgroup title="Components · translucent">
          <SwatchGrid items={TRANSLUCENT} />
        </Subgroup>
        <Subgroup title="Core accent">
          <SwatchGrid items={CORE} />
          <p className="text-content-standard-tertiary text-footnote">
            <InlineCode>accent-strong</InlineCode>은 밝은 배경 위 텍스트/링크.{" "}
            <InlineCode>accent-translucent</InlineCode>은 soft fill.
          </p>
        </Subgroup>
        <Subgroup title="Status">
          <SwatchGrid items={STATUS} />
          <SwatchGrid items={STATUS_TRANSLUCENT} />
          <p className="text-content-standard-tertiary text-footnote">
            success / warning / danger / info — 피드백·배지·인라인 알림. 본문 장식용 색으로 쓰지 말 것.
          </p>
        </Subgroup>
        <Subgroup title="Line">
          <SwatchGrid items={LINES} />
        </Subgroup>
        <Subgroup title="Roles on surface">
          <div className="flex flex-col gap-spacing-200 rounded-radius-md border border-line-outline p-spacing-500">
            <p className="text-content-standard-primary text-label">primary — 제목, 본문 핵심</p>
            <p className="text-content-standard-secondary text-label">secondary — 설명 문단</p>
            <p className="text-content-standard-tertiary text-label">tertiary — 메타, 보조 라벨</p>
            <p className="text-content-standard-quaternary text-label">quaternary — 인덱스, 희미한 chrome</p>
            <p className="text-core-accent text-label">core-accent — 브랜드 포인트</p>
            <p className="text-core-accent-strong text-label">core-accent-strong — 라이트 배경 링크</p>
            <p className="text-label text-status-danger">status-danger — 오류·파괴 액션</p>
            <p className="text-label text-status-success">status-success — 성공·확인</p>
          </div>
        </Subgroup>
      </DocSection>

      <DocSection
        id="typography"
        index={4}
        title="Typography"
        description="Wanted Sans Variable (본문) + system mono. hero만 fluid clamp(). caption/display 단계 없음 — 스케일을 얇게 유지.">
        <div className="flex flex-col gap-spacing-600">
          {TYPE_SCALE.map((item) => (
            <div
              key={item.token}
              className="flex flex-col gap-spacing-200 border-line-divider border-t pt-spacing-500 first:border-t-0 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-spacing-200">
                <code className="font-mono text-content-standard-quaternary text-footnote">text-{item.token}</code>
                <span className="font-mono text-content-standard-quaternary text-footnote">{item.meta}</span>
              </div>
              <p className={`text-content-standard-primary ${item.className}`}>{item.sample}</p>
            </div>
          ))}
        </div>
        <Subgroup title="Tracking">
          <ul className="flex flex-col">
            <TokenRow
              token="tracking-label-wide"
              value="0.22em · sidebar / brand mono labels"
              preview={
                <span className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
                  Product Engineer
                </span>
              }
            />
            <TokenRow
              token="tracking-wider / tracking-widest"
              value="Tailwind built-in · intentional exception"
              preview={
                <span className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-widest">
                  More
                </span>
              }
            />
          </ul>
        </Subgroup>
        <Subgroup title="Font family">
          <div className="flex flex-col gap-spacing-300">
            <p className="text-body text-content-standard-primary">Sans — Wanted Sans Variable / system UI</p>
            <p className="font-mono text-body text-content-standard-primary">Mono — SF Mono / JetBrains / Menlo</p>
          </div>
        </Subgroup>
        <Subgroup title="Usage matrix">
          <KeyValueList
            rows={[
              { key: "Page title", value: "text-hero font-semibold" },
              { key: "Section title", value: "text-title font-semibold" },
              { key: "Card / entry title", value: "text-heading or text-body font-semibold" },
              { key: "Body / description", value: "text-label or text-body + content-secondary" },
              { key: "Chrome / index", value: "text-footnote font-mono tabular-nums" },
            ]}
          />
        </Subgroup>
      </DocSection>

      <DocSection
        id="spacing"
        index={5}
        title="Spacing"
        description="p-spacing-* / gap-spacing-* / m-spacing-*. 임의 px 금지. 스케일 사이 값은 더 가까운 토큰으로 반올림.">
        <ul className="flex flex-col">
          {SPACING.map((item) => (
            <TokenRow
              key={item.token}
              token={item.token}
              value={item.px}
              preview={<div className={`h-spacing-300 bg-core-accent ${item.className}`} />}
            />
          ))}
        </ul>
        <KeyValueList
          rows={[
            { key: "Inline tight", value: "spacing-100 … 200" },
            { key: "Component padding", value: "spacing-300 … 500" },
            { key: "Section rhythm", value: "spacing-700 … 900" },
            { key: "Page block gap", value: "spacing-850 / md:spacing-900" },
          ]}
        />
      </DocSection>

      <DocSection
        id="radius"
        index={6}
        title="Radius"
        description="rounded-radius-{sm,md,lg,full}. 한 화면 안에서 단계를 섞되 의미 있게.">
        <div className="grid grid-cols-2 gap-spacing-400 sm:grid-cols-4">
          {RADII.map((item) => (
            <div key={item.token} className="flex flex-col items-start gap-spacing-200">
              <div className={`h-16 w-16 bg-core-accent-translucent ring-1 ring-line-outline ${item.className}`} />
              <code className="font-mono text-content-standard-tertiary text-footnote">{item.token}</code>
              <span className="font-mono text-content-standard-quaternary text-footnote">{item.px}</span>
              <span className="text-content-standard-tertiary text-footnote">{item.use}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection
        id="elevation"
        index={7}
        title="Elevation"
        description="shadow-elevation-{1,2,3}. 에디토리얼 기본은 ring/border. 그림자는 떠 있는 레이어에만.">
        <div className="grid grid-cols-1 gap-spacing-400 sm:grid-cols-3">
          {ELEVATIONS.map((item) => (
            <div
              key={item.token}
              className={`flex flex-col gap-spacing-300 rounded-radius-md bg-background-standard-primary p-spacing-500 ring-1 ring-line-outline ${item.className}`}>
              <code className="font-mono text-content-standard-primary text-footnote">{item.token}</code>
              <span className="text-content-standard-tertiary text-footnote">{item.value}</span>
            </div>
          ))}
        </div>
        <Callout tone="note" title="Default surface">
          카드·섹션의 기본 분리는 <InlineCode>ring-1 ring-line-outline</InlineCode> 또는{" "}
          <InlineCode>border-line-divider</InlineCode>. elevation은 오버레이/모달 도입 시 사용.
        </Callout>
      </DocSection>

      <DocSection
        id="z-index"
        index={8}
        title="Z-index"
        description="z-{base,raised,sticky,overlay,modal,toast}. 임의 z-[999] 금지.">
        <ul className="flex flex-col">
          {Z_INDEX.map((item) => (
            <TokenRow
              key={item.token}
              token={item.token}
              value={`${item.value} · ${item.use}`}
              preview={
                <span className="font-mono text-content-standard-quaternary text-footnote tabular-nums">
                  {item.value}
                </span>
              }
            />
          ))}
        </ul>
      </DocSection>

      <DocSection
        id="motion"
        index={9}
        title="Motion"
        description="duration-{fast,base,slow} + ease-standard. prefers-reduced-motion 시 duration ≈ 0.">
        <ul className="flex flex-col">
          {MOTION.map((item) => (
            <TokenRow key={item.token} token={item.token} value={`${item.value} · ${item.use}`} />
          ))}
        </ul>
        <div className="flex flex-wrap gap-spacing-400">
          {(
            [
              { label: "fast", className: "duration-fast" },
              { label: "base", className: "duration-base" },
              { label: "slow", className: "duration-slow" },
            ] as const
          ).map((item) => (
            <button
              key={item.label}
              type="button"
              className={`rounded-radius-md bg-components-fill-standard-tertiary px-spacing-400 py-spacing-300 font-mono text-content-standard-secondary text-footnote transition-colors ease-standard hover:bg-core-accent hover:text-content-inverted-primary ${item.className} ${FOCUS_RING}`}>
              hover · {item.label}
            </button>
          ))}
        </div>
        <DoDont
          doItems={["hover / focus / active / expand 상태 전환", "미디어 hover scale은 duration-slow + ease-standard"]}
          dontItems={["스크롤 진입 페이드/슬라이드 장식", "페이지 로드 시 연속 스태거 애니메이션"]}
        />
      </DocSection>

      <DocSection
        id="layout"
        index={10}
        title="Layout"
        description="읽기 열 max-w-content(720). 셸 max-w-shell(72rem). 사이드바 240 @ lg.">
        <ul className="flex flex-col">
          <TokenRow token="max-w-content" value="720px · reading column / docs main" />
          <TokenRow token="max-w-shell" value="72rem · page outer shell" />
          <TokenRow token="sidebar" value="240px sticky · lg:grid-cols-[240px_minmax(0,1fr)]" />
          <TokenRow token="section gap" value="gap-spacing-850 / md:gap-spacing-900" />
          <TokenRow token="page padding" value="px-spacing-500 → 700 → 800" />
        </ul>
        <Subgroup title="Breakpoints">
          <ul className="flex flex-col">
            {BREAKPOINTS.map((item) => (
              <TokenRow key={item.token} token={item.token} value={`${item.value} · ${item.use}`} />
            ))}
          </ul>
        </Subgroup>
        <div className="overflow-hidden rounded-radius-md ring-1 ring-line-outline">
          <div className="grid grid-cols-[72px_1fr] gap-spacing-200 bg-background-standard-secondary p-spacing-300">
            <div className="rounded-radius-sm bg-components-translucent-primary p-spacing-200 font-mono text-content-standard-tertiary text-footnote">
              240
            </div>
            <div className="flex flex-col gap-spacing-200">
              <div className="rounded-radius-sm bg-core-accent-translucent px-spacing-300 py-spacing-200 font-mono text-content-standard-secondary text-footnote">
                max-w-content · 720
              </div>
              <div className="h-10 rounded-radius-sm bg-components-translucent-secondary" />
              <div className="h-16 rounded-radius-sm bg-components-translucent-tertiary" />
            </div>
          </div>
        </div>
      </DocSection>

      <DocSection
        id="iconography"
        index={11}
        title="Iconography"
        description="lucide-react 기본. 브랜드 마크는 인라인 SVG (lucide 1.x 상표 제거). stroke 1.75 기본.">
        <ul className="flex flex-col">
          {ICONS.map((item) => (
            <TokenRow
              key={item.token}
              token={item.token}
              value={`${item.value} · ${item.use}`}
              preview={
                <div className="size-icon-md rounded-radius-sm bg-core-accent-translucent ring-1 ring-line-outline" />
              }
            />
          ))}
        </ul>
        <RuleList
          items={[
            {
              title: "currentColor",
              body: "아이콘은 부모 text-* 색을 상속. 하드코딩 fill 금지(로고 예외).",
            },
            {
              title: "Decorative",
              body: (
                <>
                  의미 없는 아이콘은 <InlineCode>aria-hidden</InlineCode>. 링크는 부모에{" "}
                  <InlineCode>aria-label</InlineCode>.
                </>
              ),
            },
            {
              title: "Brand marks",
              body: (
                <>
                  GitHub / LinkedIn / Instagram 등은 <InlineCode>features/socials.tsx</InlineCode> 인라인 SVG 패턴 복제.
                </>
              ),
            },
          ]}
        />
      </DocSection>

      <DocSection
        id="patterns"
        index={12}
        title="Patterns"
        description="반복되는 인터랙션·피드백 계약. 새 화면은 여기서 고르고 시작.">
        <Subgroup title="Focus ring">
          <a
            href="#patterns"
            className={`inline-flex rounded-radius-sm font-mono text-content-standard-secondary text-footnote underline-offset-2 hover:text-content-standard-primary hover:underline ${FOCUS_RING}`}>
            Tab here — ring-core-accent/50 + offset
          </a>
          <CodeBlock>{`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50
focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary`}</CodeBlock>
        </Subgroup>
        <Subgroup title="Interactive states">
          <KeyValueList
            rows={[
              { key: "hover", value: "text brighten · bg interactive-hover · accent fill" },
              { key: "focus-visible", value: "ring only (not on mouse click)" },
              { key: "pressed / active", value: "interactive-pressed or darker accent" },
              { key: "disabled", value: "opacity + pointer-events-none · keep layout" },
            ]}
          />
        </Subgroup>
        <Subgroup title="Feedback">
          <div className="flex flex-col gap-spacing-200">
            <div className="rounded-radius-md border border-status-success/40 bg-status-success-translucent px-spacing-400 py-spacing-300 text-label text-status-success">
              성공 — 저장되었습니다
            </div>
            <div className="rounded-radius-md border border-status-warning/40 bg-status-warning-translucent px-spacing-400 py-spacing-300 text-label text-status-warning">
              주의 — 일부 항목을 확인하세요
            </div>
            <div className="rounded-radius-md border border-status-danger/40 bg-status-danger-translucent px-spacing-400 py-spacing-300 text-label text-status-danger">
              오류 — 요청을 처리하지 못했습니다
            </div>
            <div className="rounded-radius-md border border-status-info/40 bg-status-info-translucent px-spacing-400 py-spacing-300 text-label text-status-info">
              정보 — 새 버전이 배포되었습니다
            </div>
          </div>
        </Subgroup>
        <Subgroup title="Density">
          <KeyValueList
            rows={[
              { key: "Editorial (default)", value: "넓은 section gap, 긴 줄간격, 적은 chrome" },
              { key: "Compact lists", value: "RecordRow · py-spacing-400 · border-t rhythm" },
              { key: "Controls", value: "min touch 44px 목표 · 아이콘 버튼은 hit area 확보" },
            ]}
          />
        </Subgroup>
        <Subgroup title="Forms (contract)">
          <RuleList
            items={[
              {
                title: "Label always",
                body: "placeholder-only 라벨 금지. 에러는 status-danger + 필드 연결.",
              },
              {
                title: "Primary action",
                body: "한 뷰에 primary 하나. 파괴 액션은 status-danger 계열.",
              },
              {
                title: "Validation copy",
                body: "한국어 UI · 원인 + 다음 행동. 기술 스택 트레이스 노출 금지.",
              },
            ]}
          />
        </Subgroup>
      </DocSection>

      <DocSection
        id="components"
        index={13}
        title="Components"
        description="src/shared/ui 프리미티브. 라이브 데모 + API. 도메인 결합 컴포넌트는 명시.">
        <Subgroup title="Layering">
          <KeyValueList
            rows={[
              { key: "Primitive", value: "Button, Chip, Tag, Section, Description, Collapsible, …" },
              { key: "Composite", value: "TimelineEntry, RecordRow/Group — still domain-light" },
              { key: "Domain", value: "ProjectCard (Project type) — prefer features when product grows" },
            ]}
          />
        </Subgroup>

        <Subgroup title="Section">
          <div className="rounded-radius-md ring-1 ring-line-outline">
            <div className="px-spacing-500 pb-spacing-500">
              <Section id="ds-section-demo" title="Section title" index={3} count={12}>
                <p className="text-content-standard-secondary text-label">
                  border-t + index/count mono chrome. 섹션 본문은 children.
                </p>
              </Section>
            </div>
          </div>
          <PropsTable
            rows={[
              { name: "id", type: "string?", description: "anchor id · scroll-mt applied" },
              { name: "title", type: "string", description: "h2 heading" },
              { name: "index", type: "number?", description: "left mono index 01…" },
              { name: "count", type: "number?", description: "right mono count when > 0" },
              { name: "children", type: "ReactNode", description: "section body" },
            ]}
          />
        </Subgroup>

        <Subgroup title="Chip">
          <div className="flex flex-wrap gap-spacing-150">
            <Chip name="React" />
            <Chip name="TypeScript" />
            <Chip name="Next.js" />
          </div>
          <PropsTable rows={[{ name: "name", type: "string", description: "uppercase mono label" }]} />
        </Subgroup>

        <Subgroup title="Tag">
          <div className="flex flex-wrap items-center gap-spacing-400">
            <Tag name="TypeScript" isMain />
            <Tag name="Swift" />
            <Tag name="Figma" />
          </div>
          <PropsTable
            rows={[
              { name: "name", type: "string", description: "visible label" },
              { name: "icon", type: "string | null?", description: "optional image URL" },
              { name: "isMain", type: "boolean?", defaultValue: "false", description: "full-contrast primary text" },
            ]}
          />
        </Subgroup>

        <Subgroup title="Button">
          <div className="max-w-xs">
            <Button text="Action" />
          </div>
          <PropsTable
            rows={[
              { name: "text", type: "string", description: "uppercase mono label" },
              {
                name: "…props",
                type: "ButtonHTMLAttributes",
                description: "native button attrs (type defaults button)",
              },
            ]}
          />
        </Subgroup>

        <Subgroup title="Description">
          <Description>
            {`마크다운 라이트 파서. **강조**, [링크](https://sspzoa.io), 리스트를 지원합니다.

- 첫 번째 항목
- 두 번째 항목`}
          </Description>
          <PropsTable
            rows={[{ name: "children", type: "string", description: "markdown-lite source · server-rendered" }]}
          />
        </Subgroup>

        <Subgroup title="Collapsible">
          <Collapsible maxHeight={72}>
            <Description>{LONG_MARKDOWN}</Description>
          </Collapsible>
          <PropsTable
            rows={[
              { name: "children", type: "ReactNode", description: "clamped content" },
              {
                name: "maxHeight",
                type: "number",
                description: "px clamp before toggle · rare raw-number exception",
              },
            ]}
          />
        </Subgroup>

        <Subgroup title="TimelineEntry">
          <TimelineEntry
            period="2024.03 – Present"
            title="Product Engineer"
            subtitle="Example Studio"
            description="타임라인 엔트리. 왼쪽 period 컬럼, 오른쪽 제목·부제·설명."
          />
          <TimelineEntry
            period="2022.06 – 2024.02"
            title="Frontend Engineer"
            subtitle="Previous Co."
            description="first 항목 이후 border-t로 구분됩니다."
          />
          <PropsTable
            rows={[
              { name: "period", type: "string", description: "left mono time column" },
              { name: "title", type: "string", description: "primary heading" },
              { name: "subtitle", type: "string | null?", description: "secondary line" },
              { name: "logo", type: "string | null?", description: "optional 32px mark" },
              { name: "description", type: "string | null?", description: "markdown-lite body" },
            ]}
          />
        </Subgroup>

        <Subgroup title="RecordGroup · RecordRow">
          <RecordGroup title="Awards">
            <ul>
              <RecordRow title="Example Award" meta="Host Org" badge="대상" date="2025.11" />
              <RecordRow title="Another Record" meta="Conference" date="2024.05" />
            </ul>
          </RecordGroup>
          <PropsTable
            rows={[
              { name: "RecordGroup.title", type: "string", description: "uppercase mono subgroup label" },
              { name: "RecordRow.title", type: "string", description: "primary text" },
              { name: "RecordRow.meta", type: "string | null?", description: "mono secondary" },
              { name: "RecordRow.badge", type: "string | null?", description: "accent emphasis" },
              { name: "RecordRow.date", type: "string | null?", description: "mono tabular date" },
            ]}
          />
        </Subgroup>

        <Subgroup title="ProjectCard">
          <Callout tone="note" title="Domain composite">
            <InlineCode>Project</InlineCode> 타입에 결합. 제품이 커지면 features 쪽으로 옮기고 shared/ui는 순수
            프리미티브만 유지하는 것을 권장합니다.
          </Callout>
        </Subgroup>
      </DocSection>

      <DocSection
        id="accessibility"
        index={14}
        title="Accessibility"
        description="새 마크업 체크리스트. Biome a11y 일부 off여도 제품 기준은 유지.">
        <RuleList
          items={[
            {
              title: "Skip link",
              body: (
                <>
                  layout <InlineCode>#main-content</InlineCode> 유지. main은 <InlineCode>{"tabIndex={-1}"}</InlineCode>.
                </>
              ),
            },
            {
              title: "Name & role",
              body: "아이콘 버튼/링크에 접근 가능 이름. 토글은 aria-expanded / aria-controls.",
            },
            {
              title: "Focus order",
              body: "DOM 순서가 읽기 순서. 모달 도입 시 focus trap + ESC.",
            },
            {
              title: "Color contrast",
              body: "primary/secondary 텍스트 대비 검증. status 색만으로 의미 전달 금지(아이콘·카피 병행).",
            },
            {
              title: "Motion",
              body: "prefers-reduced-motion 존중. 필수 아닌 애니메이션 제거.",
            },
            {
              title: "Images",
              body: (
                <>
                  장식 <InlineCode>alt=&quot;&quot;</InlineCode> · 정보성 이미지는 의미 있는 alt.
                </>
              ),
            },
          ]}
        />
      </DocSection>

      <DocSection id="extension" index={15} title="Extension" description="토큰·컴포넌트·패턴을 추가할 때의 고정 절차.">
        <Subgroup title="Add a token">
          <CodeBlock caption="globals.css">{ADD_TOKEN}</CodeBlock>
        </Subgroup>
        <Subgroup title="Add a primitive">
          <RuleList
            items={[
              {
                title: "Location",
                body: (
                  <>
                    <InlineCode>src/shared/ui/kebab-name.tsx</InlineCode> · named export
                  </>
                ),
              },
              {
                title: "API",
                body: "최소 props. 변형은 variant union으로 명시. className 합성 시 토큰만.",
              },
              {
                title: "Client boundary",
                body: (
                  <>
                    상태/브라우저 API 있을 때만 <InlineCode>&quot;use client&quot;</InlineCode>.
                  </>
                ),
              },
              {
                title: "Docs",
                body: "이 페이지 Components에 데모 + PropsTable. Code Style naming/export 준수.",
              },
            ]}
          />
        </Subgroup>
        <Subgroup title="Add a pattern">
          <RuleList
            items={[
              {
                title: "Promote when repeated",
                body: "2–3회 복붙되면 Patterns 섹션 + 가능하면 primitive로 승격.",
              },
              {
                title: "Keep editorial tone",
                body: "새 패턴도 토큰·모션·포커스 계약을 깨지 말 것.",
              },
            ]}
          />
        </Subgroup>
      </DocSection>
    </DocShell>
  );
}
