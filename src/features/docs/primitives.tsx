import type { ReactNode } from "react";

export const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";

export const SHELL_LINK_CLASSNAME = `font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary ${FOCUS_RING}`;

export const INLINE_LINK_CLASSNAME = "text-core-accent-strong underline-offset-2 hover:underline";

export const INLINE_CODE_CLASSNAME = "font-mono text-footnote";

export function DocSection({
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

export function Subgroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-spacing-400">
      <h3 className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}

export function RuleList({ items }: { items: readonly { title: string; body: ReactNode }[] }) {
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

export function CodeBlock({ children, caption }: { children: string; caption?: string }) {
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

export function KeyValueList({ rows }: { rows: readonly { key: string; value: string }[] }) {
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

export function TokenRow({ token, value, preview }: { token: string; value: string; preview?: ReactNode }) {
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

export function Swatch({
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

export function TextSwatch({ token, className }: { token: string; className: string }) {
  return (
    <div className="flex min-w-0 flex-col gap-spacing-150 border-line-outline border-b pb-spacing-300">
      <p className={`text-label ${className}`}>The quick brown fox · 가나다라마바사</p>
      <code className={`break-all font-mono text-footnote ${className}`}>{token}</code>
    </div>
  );
}

export function SwatchGrid({
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

export function TextSwatchList({ items }: { items: readonly { token: string; className: string }[] }) {
  return (
    <div className="flex flex-col gap-spacing-400">
      {items.map((item) => (
        <TextSwatch key={item.token} token={item.token} className={item.className} />
      ))}
    </div>
  );
}

export function Callout({
  tone = "neutral",
  title,
  children,
}: {
  tone?: "neutral" | "do" | "dont" | "note";
  title: string;
  children: ReactNode;
}) {
  const toneClass =
    tone === "do"
      ? "border-status-success/40 bg-status-success-translucent"
      : tone === "dont"
        ? "border-status-danger/40 bg-status-danger-translucent"
        : tone === "note"
          ? "border-status-info/40 bg-status-info-translucent"
          : "border-line-outline bg-components-fill-standard-secondary";

  return (
    <aside className={`flex flex-col gap-spacing-200 rounded-radius-md border p-spacing-400 ${toneClass}`}>
      <p className="font-medium font-mono text-content-standard-primary text-footnote uppercase tracking-wider">
        {title}
      </p>
      <div className="text-content-standard-secondary text-label">{children}</div>
    </aside>
  );
}

export function PropsTable({
  rows,
}: {
  rows: readonly { name: string; type: string; defaultValue?: string; description: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-radius-md ring-1 ring-line-outline">
      <table className="w-full min-w-[36rem] border-collapse text-left">
        <thead className="bg-components-fill-standard-secondary">
          <tr>
            {["Prop", "Type", "Default", "Description"].map((heading) => (
              <th
                key={heading}
                className="border-line-divider border-b px-spacing-300 py-spacing-200 font-mono text-content-standard-tertiary text-footnote uppercase tracking-wider">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-line-divider border-b last:border-b-0">
              <td className="px-spacing-300 py-spacing-300 align-top">
                <code className="font-mono text-content-standard-primary text-footnote">{row.name}</code>
              </td>
              <td className="px-spacing-300 py-spacing-300 align-top">
                <code className="font-mono text-content-standard-tertiary text-footnote">{row.type}</code>
              </td>
              <td className="px-spacing-300 py-spacing-300 align-top">
                <code className="font-mono text-content-standard-tertiary text-footnote">
                  {row.defaultValue ?? "—"}
                </code>
              </td>
              <td className="px-spacing-300 py-spacing-300 align-top text-content-standard-secondary text-label">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DoDont({ doItems, dontItems }: { doItems: readonly string[]; dontItems: readonly string[] }) {
  return (
    <div className="grid grid-cols-1 gap-spacing-400 md:grid-cols-2">
      <Callout tone="do" title="Do">
        <ul className="flex flex-col gap-spacing-150">
          {doItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Callout>
      <Callout tone="dont" title="Don't">
        <ul className="flex flex-col gap-spacing-150">
          {dontItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Callout>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className={INLINE_CODE_CLASSNAME}>{children}</code>;
}
