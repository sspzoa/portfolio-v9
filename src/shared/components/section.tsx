import type React from "react";

interface SectionProps {
  title: string;
  index?: number;
  count?: number;
  children: React.ReactNode;
}

export default function Section({ title, index, count, children }: SectionProps) {
  return (
    <section className="flex w-full scroll-mt-spacing-600 flex-col gap-spacing-600 border-line-divider border-t pt-spacing-700">
      <header className="flex w-full items-baseline justify-between gap-spacing-400">
        <div className="flex items-baseline gap-spacing-400">
          {typeof index === "number" && (
            <span className="font-medium text-content-standard-quaternary text-footnote tabular-nums">
              {index.toString().padStart(2, "0")}
            </span>
          )}
          <h2 className="font-semibold text-content-standard-primary text-title tracking-tight">{title}</h2>
        </div>
        {typeof count === "number" && count > 0 && (
          <span className="font-medium text-content-standard-tertiary text-footnote tabular-nums">{count}</span>
        )}
      </header>
      <div className="w-full">{children}</div>
    </section>
  );
}
