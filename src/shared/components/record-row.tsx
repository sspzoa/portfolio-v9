interface RecordRowProps {
  title: string;
  meta?: string;
  badge?: string;
  date?: string;
}

// Compact editorial list row — title + meta on the left, badge/date on the right.
export default function RecordRow({ title, meta, badge, date }: RecordRowProps) {
  return (
    <li className="flex items-baseline justify-between gap-spacing-400 border-line-divider border-t py-spacing-400 first:border-t-0">
      <div className="flex min-w-0 flex-col gap-spacing-50">
        <p className="font-medium text-content-standard-primary text-label">{title}</p>
        {meta && <p className="font-mono text-content-standard-tertiary text-footnote">{meta}</p>}
      </div>
      <div className="flex shrink-0 items-baseline gap-spacing-300">
        {badge && <span className="font-medium text-core-accent text-footnote">{badge}</span>}
        {date && <span className="font-mono text-content-standard-tertiary text-footnote tabular-nums">{date}</span>}
      </div>
    </li>
  );
}
