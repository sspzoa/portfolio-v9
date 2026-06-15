const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export default function formatDate(date: string | null | undefined): string | null {
  if (!date) return null;
  if (!ISO_DATE_REGEX.test(date)) {
    console.warn(`formatDate: expected YYYY-MM-DD, received "${date}"`);
    return null;
  }
  const [year, month] = date.split("-");
  return `${year}.${month}`;
}
