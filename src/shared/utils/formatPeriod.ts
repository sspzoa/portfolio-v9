interface FormatPeriodOptions {
  /** When a start date exists but no end date, render "<start> – Present". */
  present?: boolean;
}

/**
 * Builds a date-range label from two already-formatted (or null) dates without
 * ever emitting an orphan separator. start+end -> "start – end"; start only ->
 * "start" (or "start – Present"); end only -> "end"; neither -> "".
 */
export default function formatPeriod(
  start: string | null | undefined,
  end: string | null | undefined,
  { present = false }: FormatPeriodOptions = {},
): string {
  if (start) {
    if (end) return `${start} – ${end}`;
    return present ? `${start} – Present` : start;
  }
  return end ?? "";
}
