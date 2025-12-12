interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-radius-400 bg-components-translucent-primary p-spacing-400 duration-100 hover:bg-components-interactive-hover focus:bg-components-interactive-focused active:bg-components-interactive-pressed">
      {text}
    </button>
  );
}
