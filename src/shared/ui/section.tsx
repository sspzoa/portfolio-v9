import type React from "react";

interface SectionProps {
  id?: string;
  title: string;
  index?: number;
  count?: number;
  children: React.ReactNode;
}

export function Section({ id, title, index, count, children }: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-spacing-950 border-line-divider border-t pt-spacing-700 md:pt-spacing-800 lg:scroll-mt-spacing-900">
      <header className="mb-spacing-600 flex items-baseline justify-between gap-spacing-400">
        <h2 className="font-bold text-content-standard-primary text-heading">
          {typeof index === "number" ? (
            <span className="font-normal text-content-standard-quaternary">{`## ${index.toString().padStart(2, "0")} `}</span>
          ) : (
            <span className="font-normal text-content-standard-quaternary">## </span>
          )}
          {title}
        </h2>
        {typeof count === "number" && count > 0 && (
          <span aria-hidden="true" className="font-mono text-content-standard-quaternary text-footnote tabular-nums">
            {`x${count.toString().padStart(2, "0")}`}
          </span>
        )}
      </header>
      <div className="w-full">{children}</div>
    </section>
  );
}
