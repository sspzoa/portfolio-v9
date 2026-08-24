import Image from "next/image";
import { Description } from "@/shared/ui/description";

interface TimelineEntryProps {
  period: string;
  title: string;
  subtitle?: string | null;
  logo?: string | null;
  description?: string | null;
}

export function TimelineEntry({ period, title, subtitle, logo, description }: TimelineEntryProps) {
  return (
    <article className="grid grid-cols-1 items-baseline gap-x-spacing-700 gap-y-spacing-200 border-line-divider border-t py-spacing-500 first:border-t-0 first:pt-0 md:grid-cols-[160px_1fr]">
      <time className="font-mono text-content-standard-tertiary text-footnote tabular-nums">{`## ${period}`}</time>
      <div className="flex min-w-0 flex-col gap-spacing-300">
        <div className="flex items-center gap-spacing-300">
          {logo && (
            <Image
              className="h-8 w-8 shrink-0 object-contain"
              width={32}
              height={32}
              src={logo}
              alt=""
              sizes="32px"
              draggable={false}
            />
          )}
          <div className="flex min-w-0 flex-col">
            <h3 className="flex items-baseline gap-spacing-200 font-bold text-content-standard-primary text-heading">
              <span
                aria-hidden="true"
                className="shrink-0 select-none font-mono font-normal text-content-standard-quaternary text-label">
                [+]
              </span>
              {title}
            </h3>
            {subtitle && <p className="text-content-standard-tertiary text-label">{subtitle}</p>}
          </div>
        </div>
        {description && <Description>{description}</Description>}
      </div>
    </article>
  );
}
