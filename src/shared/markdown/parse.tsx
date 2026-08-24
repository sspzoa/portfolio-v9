import Link from "next/link";
import type React from "react";

// Server-safe markdown-lite parser: **bold**, [text](url), "- " / "• " lists,
// blank-line-separated paragraphs. Used by Description.

type Block = { type: "list"; items: string[] } | { type: "text"; lines: string[] };

const parseInline = (text: string): React.ReactNode[] => {
  const pattern = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  return text.split(pattern).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-bold text-content-standard-primary">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <Link
          key={i}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-core-accent-strong underline decoration-core-accent-strong/40 underline-offset-2 transition-colors hover:decoration-core-accent-strong focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
          {linkText}
        </Link>
      );
    }
    return part;
  });
};

const parseBlocks = (text: string): Block[] => {
  const lines = text.split("\n");
  const blocks: Block[] = [];

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    const last = blocks[blocks.length - 1];

    const bulletMatch = trimmed.match(/^[-•]\s+(.*)/);
    if (bulletMatch) {
      const content = bulletMatch[1];
      if (last?.type === "list") {
        last.items.push(content);
      } else {
        blocks.push({ type: "list", items: [content] });
      }
      continue;
    }

    if (trimmed === "") {
      if (last?.type === "text" && last.lines[last.lines.length - 1] !== "") {
        last.lines.push("");
      }
      continue;
    }

    if (last?.type === "text") {
      last.lines.push(rawLine);
    } else {
      blocks.push({ type: "text", lines: [rawLine] });
    }
  }

  return blocks;
};

export function renderMarkdown(text: string): React.ReactNode {
  const blocks = parseBlocks(text);
  return blocks.map((block, i) => {
    if (block.type === "list") {
      return (
        <ul key={i} className="flex list-none flex-col gap-spacing-100">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-baseline gap-spacing-200">
              <span aria-hidden="true" className="shrink-0 select-none font-mono text-content-standard-quaternary">
                [+]
              </span>
              <span className="min-w-0">{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className="whitespace-pre-wrap">
        {parseInline(block.lines.join("\n").replace(/\n+$/, ""))}
      </p>
    );
  });
}
