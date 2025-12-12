import type React from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="flex w-full flex-col items-start gap-spacing-400 rounded-radius-400 bg-components-fill-standard-primary p-spacing-500 md:p-spacing-600">
      <h2 className="font-semibold text-body">{title}</h2>
      <div className="w-full">{children}</div>
    </section>
  );
}
