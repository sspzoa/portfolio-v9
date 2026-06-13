interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  ariaExpanded?: boolean;
}

export default function Button({ text, onClick, variant = "ghost", ariaExpanded }: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-content-standard-primary text-background-standard-primary hover:opacity-90 active:opacity-80"
      : "border border-line-outline bg-transparent text-content-standard-secondary hover:bg-components-interactive-hover focus:bg-components-interactive-focused active:bg-components-interactive-pressed";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={ariaExpanded}
      className={`flex w-full items-center justify-center rounded-radius-400 px-spacing-500 py-spacing-400 font-semibold text-label transition-colors duration-150 ${styles}`}>
      {text}
    </button>
  );
}
