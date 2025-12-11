import type React from "react";

interface DescriptionProps {
  children: React.ReactNode;
}

export function Description({ children }: DescriptionProps) {
  return <p className="whitespace-pre-wrap text-body text-content-standard-secondary">{children}</p>;
}
