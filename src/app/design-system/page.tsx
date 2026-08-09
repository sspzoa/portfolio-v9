import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
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
  description: "Design tokens and UI primitives for sspzoa.io.",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "https://sspzoa.io/design-system",
  },
};

const NAV = [
  { id: "principles", label: "Principles" },
  { id: "color", label: "Color" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "radius", label: "Radius" },
  { id: "motion", label: "Motion" },
  { id: "layout", label: "Layout" },
  { id: "components", label: "Components" },
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

const LINES = [
  { token: "line-divider", className: "bg-line-divider" },
  { token: "line-outline", className: "bg-line-outline" },
] as const;

const TYPE_SCALE = [
  { token: "hero", className: "text-hero font-semibold tracking-tight", sample: "Hero" },
  { token: "title", className: "text-title font-semibold tracking-tight", sample: "Title 24 / 34" },
  { token: "heading", className: "text-heading font-semibold tracking-tight", sample: "Heading 20 / 28" },
  { token: "body", className: "text-body", sample: "Body 16 / 27 — 본문 문단용. 한국어 가독성에 맞춘 줄간격." },
  { token: "label", className: "text-label", sample: "Label 14 / 22 — 보조 설명, 캡션 역할" },
  { token: "footnote", className: "text-footnote font-mono uppercase tracking-wider", sample: "Footnote 12 / 18" },
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
  { token: "radius-sm", px: "6px", className: "rounded-radius-sm" },
  { token: "radius-md", px: "12px", className: "rounded-radius-md" },
  { token: "radius-lg", px: "20px", className: "rounded-radius-lg" },
  { token: "radius-full", px: "9999px", className: "rounded-radius-full" },
] as const;

const MOTION = [
  { token: "duration-fast", value: "150ms" },
  { token: "duration-base", value: "250ms" },
  { token: "duration-slow", value: "400ms" },
  { token: "ease-standard", value: "cubic-bezier(0.2, 0, 0, 1)" },
] as const;

const LONG_MARKDOWN = `포트폴리오 본문은 Notion CMS에서 내려오며, **볼드**와 [링크](https://sspzoa.io)를 지원합니다.

- 리스트 항목 하나
- 리스트 항목 둘
- 리스트 항목 셋

Collapsible은 높이가 maxHeight를 넘을 때만 더보기/접기 토글을 노출합니다.`;

function focusRingClass() {
  return "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";
}

function DsSection({
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
    <section id={id} className="scroll-mt-spacing-800 border-line-divider border-t pt-spacing-700 md:pt-spacing-800">
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

function Swatch({
  token,
  className,
  inverted = false,
}: {
  token: string;
  className: string;
  inverted?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-spacing-200">
      <div className={`h-14 w-full ring-1 ring-line-outline ${className}`} />
      <code
        className={`break-all font-mono text-footnote ${
          inverted ? "text-content-inverted-tertiary" : "text-content-standard-tertiary"
        }`}>
        {token}
      </code>
    </div>
  );
}

function TextSwatch({ token, className }: { token: string; className: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-spacing-150 border-line-outline border-b pb-spacing-300">
      <p className={`text-label ${className}`}>The quick brown fox · 가나다라마바사</p>
      <code className={`break-all font-mono text-footnote ${className}`}>{token}</code>
    </div>
  );
}

function SwatchGrid({
  items,
  inverted = false,
}: {
  items: readonly { token: string; className: string }[];
  inverted?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-spacing-400 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item) => (
        <Swatch key={item.token} token={item.token} className={item.className} inverted={inverted} />
      ))}
    </div>
  );
}

function TextSwatchList({ items }: { items: readonly { token: string; className: string }[] }) {
  return (
    <div className="flex flex-col gap-spacing-400">
      {items.map((item) => (
        <TextSwatch key={item.token} token={item.token} className={item.className} />
      ))}
    </div>
  );
}

function TokenRow({ token, value, preview }: { token: string; value: string; preview?: ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-spacing-400 border-line-divider border-t py-spacing-300 first:border-t-0">
      <div className="flex min-w-0 flex-col gap-spacing-50">
        <code className="font-mono text-content-standard-primary text-footnote">{token}</code>
        <span className="font-mono text-content-standard-tertiary text-footnote tabular-nums">{value}</span>
      </div>
      {preview}
    </li>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-6xl px-spacing-500 md:px-spacing-700 lg:px-spacing-800">
      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-spacing-850">
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-spacing-800">
          <div className="flex flex-col gap-spacing-150">
            <Link
              href="/"
              className={`font-semibold text-content-standard-primary text-label tracking-tight ${focusRingClass()}`}>
              Seungpyo Suh<span className="text-core-accent">.</span>
            </Link>
            <p className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
              Design System
            </p>
          </div>

          <nav aria-label="Design system sections" className="flex flex-col gap-spacing-150">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`font-mono text-content-standard-tertiary text-footnote transition-colors duration-fast hover:text-content-standard-primary ${focusRingClass()}`}>
                {item.label}
              </a>
            ))}
          </nav>

          <Link
            href="/"
            className={`font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary ${focusRingClass()}`}>
            ← Portfolio
          </Link>
        </aside>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-w-0 max-w-content flex-col py-spacing-700 md:py-spacing-800">
          <header className="flex flex-col gap-spacing-500 pb-spacing-200">
            <div className="flex flex-wrap items-baseline justify-between gap-spacing-400 lg:hidden">
              <p className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
                Design System
              </p>
              <Link
                href="/"
                className={`font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary ${focusRingClass()}`}>
                ← Portfolio
              </Link>
            </div>
            <h1 className="font-semibold text-content-standard-primary text-hero">
              Design<span className="text-core-accent">.</span>
            </h1>
            <p className="max-w-content text-body text-content-standard-secondary">
              sspzoa.io 토큰 스케일과 UI 프리미티브. Layer 2 semantic 토큰만 컴포넌트에서 사용하고, Layer 1{" "}
              <code className="font-mono text-footnote">--solid-*</code> 원시값은 CSS에서만 참조합니다. 테마는{" "}
              <code className="font-mono text-footnote">prefers-color-scheme</code> 기반이며 토글 UI는 없습니다.
            </p>
          </header>

          <div className="mt-spacing-850 flex flex-col gap-spacing-850 md:mt-spacing-900 md:gap-spacing-900">
            <DsSection
              id="principles"
              index={1}
              title="Principles"
              description="에디토리얼 이력서 레이아웃. 장식용 스크롤 리빌 없이, 상태 변화(hover/focus/active)에만 모션을 둡니다.">
              <ul className="flex flex-col gap-spacing-300 text-content-standard-secondary text-label">
                <li className="border-line-divider border-t pt-spacing-300 first:border-t-0 first:pt-0">
                  <span className="font-medium text-content-standard-primary">Tokens only</span> —
                  간격·색·반경·타이포·모션은 토큰 스케일에서만.
                </li>
                <li className="border-line-divider border-t pt-spacing-300">
                  <span className="font-medium text-content-standard-primary">Semantic over primitive</span> —
                  Tailwind에는 Layer 2만 노출. <code className="font-mono text-footnote">--solid-*</code> 직접 사용
                  금지.
                </li>
                <li className="border-line-divider border-t pt-spacing-300">
                  <span className="font-medium text-content-standard-primary">Server by default</span> — 인터랙션이
                  필요할 때만 <code className="font-mono text-footnote">"use client"</code>.
                </li>
                <li className="border-line-divider border-t pt-spacing-300">
                  <span className="font-medium text-content-standard-primary">Named exports</span> — Next.js 엔트리 제외
                  전부 export.
                </li>
                <li className="border-line-divider border-t pt-spacing-300">
                  <span className="font-medium text-content-standard-primary">a11y</span> — skip link,{" "}
                  <code className="font-mono text-footnote">focus-visible</code> 링,{" "}
                  <code className="font-mono text-footnote">prefers-reduced-motion</code> 존중.
                </li>
              </ul>
            </DsSection>

            <DsSection
              id="color"
              index={2}
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
                  <code className="font-mono">accent-strong</code>은 밝은 배경 위 텍스트용. 본문 강조 링크 등에 사용.
                </p>
              </Subgroup>
              <Subgroup title="Line">
                <SwatchGrid items={LINES} />
              </Subgroup>
              <Subgroup title="Text on surface">
                <div className="flex flex-col gap-spacing-200 rounded-radius-md border border-line-outline p-spacing-500">
                  <p className="text-content-standard-primary text-label">primary — 제목, 본문 핵심</p>
                  <p className="text-content-standard-secondary text-label">secondary — 설명 문단</p>
                  <p className="text-content-standard-tertiary text-label">tertiary — 메타, 보조 라벨</p>
                  <p className="text-content-standard-quaternary text-label">quaternary — 인덱스 번호, 희미한 chrome</p>
                  <p className="text-core-accent text-label">core-accent — 포인트</p>
                  <p className="text-core-accent-strong text-label">core-accent-strong — 라이트 배경 링크</p>
                </div>
              </Subgroup>
            </DsSection>

            <DsSection
              id="typography"
              index={3}
              title="Typography"
              description="Wanted Sans Variable (본문) + system mono 스택. hero만 fluid clamp().">
              <div className="flex flex-col gap-spacing-600">
                {TYPE_SCALE.map((item) => (
                  <div
                    key={item.token}
                    className="flex flex-col gap-spacing-200 border-line-divider border-t pt-spacing-500 first:border-t-0 first:pt-0">
                    <code className="font-mono text-content-standard-quaternary text-footnote">text-{item.token}</code>
                    <p className={`text-content-standard-primary ${item.className}`}>{item.sample}</p>
                  </div>
                ))}
              </div>
              <Subgroup title="Tracking">
                <ul className="flex flex-col">
                  <TokenRow
                    token="tracking-label-wide"
                    value="0.22em"
                    preview={
                      <span className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
                        Product Engineer
                      </span>
                    }
                  />
                  <TokenRow
                    token="tracking-wider / tracking-widest"
                    value="Tailwind built-in (intentional)"
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
                  <p className="font-mono text-body text-content-standard-primary">
                    Mono — SF Mono / JetBrains / Menlo
                  </p>
                </div>
              </Subgroup>
            </DsSection>

            <DsSection
              id="spacing"
              index={4}
              title="Spacing"
              description="p-spacing-*, gap-spacing-*, m-spacing-* 형태로 사용. 임의 px 금지.">
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
            </DsSection>

            <DsSection id="radius" index={5} title="Radius" description="rounded-radius-{sm,md,lg,full}">
              <div className="grid grid-cols-2 gap-spacing-400 sm:grid-cols-4">
                {RADII.map((item) => (
                  <div key={item.token} className="flex flex-col items-start gap-spacing-200">
                    <div
                      className={`h-16 w-16 bg-core-accent-translucent ring-1 ring-line-outline ${item.className}`}
                    />
                    <code className="font-mono text-content-standard-tertiary text-footnote">{item.token}</code>
                    <span className="font-mono text-content-standard-quaternary text-footnote">{item.px}</span>
                  </div>
                ))}
              </div>
            </DsSection>

            <DsSection
              id="motion"
              index={6}
              title="Motion"
              description="duration-{fast,base,slow} + ease-standard. prefers-reduced-motion 시 duration이 거의 0으로 강제됩니다.">
              <ul className="flex flex-col">
                {MOTION.map((item) => (
                  <TokenRow key={item.token} token={item.token} value={item.value} />
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
                    className={`rounded-radius-md bg-components-fill-standard-tertiary px-spacing-400 py-spacing-300 font-mono text-content-standard-secondary text-footnote transition-colors ease-standard hover:bg-core-accent hover:text-content-inverted-primary ${item.className} ${focusRingClass()}`}>
                    hover · {item.label}
                  </button>
                ))}
              </div>
            </DsSection>

            <DsSection
              id="layout"
              index={7}
              title="Layout"
              description="읽기 열 max-w-content(720px). 데스크톱 사이드바 그리드 lg:grid-cols-[240px_minmax(0,1fr)].">
              <ul className="flex flex-col">
                <TokenRow token="max-w-content" value="720px (--content-max)" />
                <TokenRow token="page shell" value="max-w-6xl + px-spacing-500/700/800" />
                <TokenRow token="sidebar" value="240px sticky column @ lg" />
                <TokenRow token="section gap" value="gap-spacing-850 / md:gap-spacing-900" />
              </ul>
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
            </DsSection>

            <DsSection
              id="components"
              index={8}
              title="Components"
              description="src/shared/ui 프리미티브. 실제 포트폴리오와 동일한 컴포넌트입니다.">
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
              </Subgroup>

              <Subgroup title="Chip">
                <div className="flex flex-wrap gap-spacing-150">
                  <Chip name="React" />
                  <Chip name="TypeScript" />
                  <Chip name="Next.js" />
                </div>
              </Subgroup>

              <Subgroup title="Tag">
                <div className="flex flex-wrap items-center gap-spacing-400">
                  <Tag name="TypeScript" isMain />
                  <Tag name="Swift" />
                  <Tag name="Figma" />
                </div>
              </Subgroup>

              <Subgroup title="Button">
                <div className="max-w-xs">
                  <Button text="Action" />
                </div>
              </Subgroup>

              <Subgroup title="Description">
                <Description>
                  {`마크다운 라이트 파서. **강조**, [링크](https://sspzoa.io), 리스트를 지원합니다.

- 첫 번째 항목
- 두 번째 항목`}
                </Description>
              </Subgroup>

              <Subgroup title="Collapsible">
                <Collapsible maxHeight={72}>
                  <Description>{LONG_MARKDOWN}</Description>
                </Collapsible>
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
              </Subgroup>

              <Subgroup title="RecordGroup · RecordRow">
                <RecordGroup title="Awards">
                  <ul>
                    <RecordRow title="Example Award" meta="Host Org" badge="대상" date="2025.11" />
                    <RecordRow title="Another Record" meta="Conference" date="2024.05" />
                  </ul>
                </RecordGroup>
              </Subgroup>

              <Subgroup title="Focus ring">
                <a
                  href="#components"
                  className={`inline-flex rounded-radius-sm font-mono text-content-standard-secondary text-footnote underline-offset-2 hover:text-content-standard-primary hover:underline ${focusRingClass()}`}>
                  Tab here — ring-core-accent/50 + offset
                </a>
              </Subgroup>
            </DsSection>
          </div>

          <footer className="mt-spacing-900 border-line-divider border-t pt-spacing-600">
            <p className="font-mono text-content-standard-quaternary text-footnote">
              tokens · globals.css + tailwind.config.ts · components · src/shared/ui
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
