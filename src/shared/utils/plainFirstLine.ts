export function plainFirstLine(markdown: string): string {
  const line = markdown
    .split("\n")
    .map((part) => part.trim())
    .find(Boolean);

  if (!line) return "";

  return line.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\[(.*?)\]\((.*?)\)/g, "$1");
}
