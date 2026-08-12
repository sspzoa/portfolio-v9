interface ChipProps {
  name: string;
}

// Outlined monospace chip — project tags, activity hosts.
export function Chip({ name }: ChipProps) {
  return (
    <span className="whitespace-nowrap rounded-radius-full border border-line-outline px-spacing-200 py-spacing-50 font-mono text-content-standard-tertiary text-footnote uppercase tracking-wider">
      {name}
    </span>
  );
}
