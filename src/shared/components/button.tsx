import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

// Editorial text action — a hairline-topped, monospace label that brightens on hover.
export default function Button({ text, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className="flex w-full items-center justify-center gap-spacing-200 border-line-divider border-t pt-spacing-600 font-medium font-mono text-content-standard-tertiary text-footnote uppercase tracking-widest transition-colors duration-150 hover:text-content-standard-primary focus-visible:rounded-radius-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
      {text}
    </button>
  );
}
