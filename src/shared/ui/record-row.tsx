interface RecordRowProps {
  title: string;
  meta?: string | null;
  badge?: string | null;
  date?: string | null;
}

// List row with an ASCII bracket bullet — title + meta left, badge/date right.
export function RecordRow({ title, meta, badge, date }: RecordRowProps) {
  return (
    <li className="flex items-baseline justify-between gap-spacing-400 border-line-divider border-t py-spacing-400 first:border-t-0">
      <div className="flex min-w-0 items-baseline gap-spacing-200">
        <span aria-hidden="true" className="shrink-0 select-none font-mono text-content-standard-quaternary text-label">
          [+]
        </span>
        <div className="flex min-w-0 flex-col gap-spacing-50">
          <p className="font-medium text-content-standard-primary text-label">{title}</p>
          {meta && <p className="font-mono text-content-standard-tertiary text-footnote">{meta}</p>}
        </div>
      </div>
      <div className="flex shrink-0 items-baseline gap-spacing-300">
        {badge && <span className="font-bold text-core-accent-strong text-footnote">{badge}</span>}
        {date && <span className="font-mono text-content-standard-tertiary text-footnote tabular-nums">{date}</span>}
      </div>
    </li>
  );
}
