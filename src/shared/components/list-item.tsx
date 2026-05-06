interface ListItemProps {
  title: string;
  meta: string;
  badge?: string;
  isPinned?: boolean;
}

export default function ListItem({ title, meta, badge, isPinned }: ListItemProps) {
  return (
    <li className="flex flex-row items-baseline gap-spacing-300 border-line-divider border-b py-spacing-300 last:border-b-0">
      <div className="flex min-w-0 flex-1 flex-col gap-spacing-50">
        <p
          className={`truncate text-label ${
            isPinned ? "font-bold text-core-accent" : "font-medium text-content-standard-primary"
          }`}>
          {title}
        </p>
        <p className="truncate text-content-standard-tertiary text-footnote">{meta}</p>
      </div>
      {badge && <span className="shrink-0 font-medium text-core-accent text-footnote tabular-nums">{badge}</span>}
    </li>
  );
}
