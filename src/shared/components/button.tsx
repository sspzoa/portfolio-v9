interface ButtonProps {
  text: string;
  onClick?: () => void;
  ariaExpanded?: boolean;
}

// Editorial text action — a hairline-topped, monospace label that brightens on hover.
export default function Button({ text, onClick, ariaExpanded }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={ariaExpanded}
      className="flex w-full items-center justify-center gap-spacing-200 border-line-divider border-t pt-spacing-600 font-medium font-mono text-content-standard-tertiary text-footnote uppercase tracking-widest transition-colors duration-150 hover:text-content-standard-primary">
      {text}
    </button>
  );
}
