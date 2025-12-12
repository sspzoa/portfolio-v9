import Link from "next/link";
import type React from "react";

interface DescriptionProps {
  children: React.ReactNode;
}

export function Description({ children }: DescriptionProps) {
  const parseText = (text: string): React.ReactNode[] => {
    const pattern = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;

    return text.split(pattern).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className="font-semibold text-content-standard-primary">
            {part.slice(2, -2)}
          </span>
        );
      }

      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <Link
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-solid-blue underline">
            {linkText}
          </Link>
        );
      }

      return part;
    });
  };

  return (
    <p className="whitespace-pre-wrap text-content-standard-secondary text-label leading-spacing-600">
      {typeof children === "string" ? parseText(children) : children}
    </p>
  );
}
