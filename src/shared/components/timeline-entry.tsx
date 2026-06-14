import Image from "next/image";
import { Description } from "@/shared/components/description";

interface TimelineEntryProps {
  period: string;
  title: string;
  subtitle?: string | null;
  logo?: string | null;
  description?: string | null;
}

// Résumé-style entry: a fixed period column on the left, content on the right.
export default function TimelineEntry({ period, title, subtitle, logo, description }: TimelineEntryProps) {
  return (
    <article className="reveal grid grid-cols-1 gap-spacing-300 border-line-divider border-t pt-spacing-600 first:border-t-0 first:pt-0 md:grid-cols-[150px_1fr] md:gap-spacing-700">
      <p className="pt-spacing-50 font-mono text-content-standard-tertiary text-footnote tabular-nums">{period}</p>
      <div className="flex flex-col gap-spacing-300">
        <div className="flex items-center gap-spacing-300">
          {logo && (
            <Image
              className="h-8 w-8 shrink-0 rounded-radius-200 object-contain"
              width={32}
              height={32}
              src={logo}
              alt=""
              draggable={false}
            />
          )}
          <div className="flex min-w-0 flex-col">
            <h3 className="font-semibold text-body text-content-standard-primary leading-snug">{title}</h3>
            {subtitle && <p className="text-content-standard-tertiary text-label">{subtitle}</p>}
          </div>
        </div>
        {description && <Description maxHeight={220}>{description}</Description>}
      </div>
    </article>
  );
}
