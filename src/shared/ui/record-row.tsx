interface RecordRowProps {
  title: string;
  meta?: string | null;
  badge?: string | null;
  date?: string | null;
}

// List row with an ASCII bracket bullet — title full width on narrow screens; badge/date on a second line.
export function RecordRow({ title, meta, badge, date }: RecordRowProps) {
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-spacing-200 gap-y-spacing-150 border-line-divider border-t py-spacing-400 first:border-t-0 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-baseline md:gap-y-spacing-50">
      <span
        aria-hidden="true"
        className="row-start-1 shrink-0 select-none font-mono text-content-standard-quaternary text-label">
        [+]
      </span>
      <div className="min-w-0">
        <p className="break-keep font-medium text-content-standard-primary text-label">{title}</p>
        {meta && <p className="font-mono text-content-standard-tertiary text-footnote">{meta}</p>}
      </div>
      {(badge || date) && (
        <div className="col-start-2 flex flex-wrap items-baseline gap-x-spacing-300 gap-y-spacing-100 md:col-start-3 md:row-start-1 md:justify-end">
          {badge && <span className="font-bold text-core-accent-strong text-footnote">{badge}</span>}
          {date && <span className="font-mono text-content-standard-tertiary text-footnote tabular-nums">{date}</span>}
        </div>
      )}
    </li>
  );
}
