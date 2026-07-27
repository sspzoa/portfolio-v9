import type React from "react";

interface RecordGroupProps {
  title: string;
  children: React.ReactNode;
}

// Named subgroup inside the Records section (Education / Awards / Certificates).
export function RecordGroup({ title, children }: RecordGroupProps) {
  return (
    <div className="flex flex-col gap-spacing-400">
      <h3 className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-wider">{title}</h3>
      {children}
    </div>
  );
}
