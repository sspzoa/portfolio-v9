interface ChipProps {
  name: string;
}

// Outlined monospace chip — project tags, activity hosts.
export default function Chip({ name }: ChipProps) {
  return (
    <span className="rounded-radius-full border border-line-outline px-spacing-200 py-spacing-50 font-mono text-caption text-content-standard-tertiary uppercase tracking-wider">
      {name}
    </span>
  );
}
