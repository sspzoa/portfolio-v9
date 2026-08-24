interface ChipProps {
  name: string;
}

// ASCII bracket chip — the brackets are the iconography. Project tags, activity hosts.
export function Chip({ name }: ChipProps) {
  return (
    <span className="whitespace-nowrap font-mono text-content-standard-tertiary text-footnote">{`[${name}]`}</span>
  );
}
