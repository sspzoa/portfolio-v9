import type React from "react";

interface SectionProps {
  id?: string;
  title: string;
  index?: number;
  count?: number;
  children: React.ReactNode;
}

export default function Section({ id, title, index, count, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-spacing-800 border-line-divider border-t pt-spacing-700 md:pt-spacing-800">
      <header className="reveal mb-spacing-600 flex items-baseline justify-between gap-spacing-400">
        <div className="flex items-baseline gap-spacing-400">
          {typeof index === "number" && (
            <span className="font-medium font-mono text-content-standard-quaternary text-footnote tabular-nums">
              {index.toString().padStart(2, "0")}
            </span>
          )}
          <h2 className="font-semibold text-content-standard-primary text-title tracking-tight">{title}</h2>
        </div>
        {typeof count === "number" && count > 0 && (
          <span className="font-medium font-mono text-content-standard-quaternary text-footnote tabular-nums">
            {count.toString().padStart(2, "0")}
          </span>
        )}
      </header>
      <div className="w-full">{children}</div>
    </section>
  );
}
