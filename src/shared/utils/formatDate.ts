export default function formatDate(date: string | null | undefined): string | null {
  if (!date) return null;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}
