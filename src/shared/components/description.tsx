"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface DescriptionProps {
  children: React.ReactNode;
  maxHeight?: number;
}

type Block = { type: "list"; items: string[] } | { type: "text"; lines: string[] };

const parseInline = (text: string): React.ReactNode[] => {
  const pattern = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  return text.split(pattern).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} className="font-semibold text-content-standard-primary">
          {part.slice(2, -2)}
        </span>
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
          className="font-medium text-core-accent underline-offset-2 hover:underline">
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

export function Description({ children, maxHeight }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current && maxHeight) {
        setNeedsExpansion(contentRef.current.scrollHeight > maxHeight);
      }
    };
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [children, maxHeight]);

  const renderContent = () => {
    if (typeof children !== "string") return children;

    const blocks = parseBlocks(children);
    return blocks.map((block, i) => {
      if (block.type === "list") {
        return (
          <ul
            key={i}
            className="ml-spacing-400 flex list-disc flex-col gap-spacing-100 marker:text-content-standard-quaternary">
            {block.items.map((item, j) => (
              <li key={j} className="pl-spacing-100">
                {parseInline(item)}
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
  };

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{
          maxHeight: isExpanded || !needsExpansion ? undefined : maxHeight,
        }}>
        <div className="flex flex-col gap-spacing-300 text-content-standard-secondary text-label leading-spacing-600">
          {renderContent()}
        </div>
      </div>

      {needsExpansion &&
        (!isExpanded ? (
          <div
            className="absolute right-0 bottom-0 left-0 flex h-24 items-end justify-center pb-spacing-100"
            style={{
              background: "linear-gradient(to top, var(--background-standard-primary) 30%, transparent)",
            }}>
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer font-medium text-content-standard-tertiary text-label transition-colors hover:text-content-standard-primary">
              더보기
            </button>
          </div>
        ) : (
          <div className="flex justify-center pt-spacing-300">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="cursor-pointer font-medium text-content-standard-tertiary text-label transition-colors hover:text-content-standard-primary">
              접기
            </button>
          </div>
        ))}
    </div>
  );
}
