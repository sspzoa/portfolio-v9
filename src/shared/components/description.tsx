import type React from "react";

interface DescriptionProps {
  children: React.ReactNode;
}

export function Description({ children }: DescriptionProps) {
  const parseText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className="font-semibold text-content-standard-primary">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <p className="whitespace-pre-wrap text-label text-content-standard-secondary leading-spacing-600">
      {typeof children === "string" ? parseText(children) : children}
    </p>
  );
}
