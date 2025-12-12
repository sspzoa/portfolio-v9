export default function formatDate(date: string | null): string | null {
  if (date === null) return null;
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}
