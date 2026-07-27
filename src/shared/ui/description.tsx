import { renderMarkdown } from "@/shared/markdown/parse";

interface DescriptionProps {
  children: string;
}

// Server-rendered rich text. Wrap in Collapsible when a max-height toggle is needed.
export function Description({ children }: DescriptionProps) {
  return (
    <div className="flex flex-col gap-spacing-300 text-content-standard-secondary text-label leading-7">
      {renderMarkdown(children)}
    </div>
  );
}
