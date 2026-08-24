import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

// Secondary action — hairline-bordered 4px rectangle, flat, mono label.
export function Button({ text, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className="flex w-full items-center justify-center rounded-radius-sm border border-line-outline px-spacing-500 py-spacing-150 font-medium font-mono text-content-standard-primary text-label transition-colors duration-fast hover:bg-components-interactive-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary active:bg-components-interactive-pressed">
      {text}
    </button>
  );
}
