"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useId, useRef, useState } from "react";

interface DescriptionProps {
  children: React.ReactNode;
  maxHeight?: number;
}

type Block = { type: "list"; items: string[] } | { type: "text"; lines: string[] };

const parseInline = (text: string): React.ReactNode[] => {
  const pattern = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  return text.split(pattern).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      return (
        <strong key={i} className="font-semibold text-content-standard-primary">
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
          className="font-medium text-core-accent decoration-core-accent/40 underline-offset-2 transition-colors hover:underline focus-visible:rounded-radius-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentId = useId();

  useEffect(() => {
    let animationFrame: number;

    const checkHeight = () => {
      if (contentRef.current && maxHeight) {
        setNeedsExpansion(contentRef.current.scrollHeight > maxHeight);
      }
    };

    const handleResize = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(checkHeight);
    };

    checkHeight();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrame);
    };
  }, [children, maxHeight]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    // Return focus to the toggle button after React re-renders the new label.
    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  };

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
        id={contentId}
        className="overflow-hidden"
        style={{
          maxHeight: isExpanded || !needsExpansion ? undefined : maxHeight,
        }}>
        <div className="flex flex-col gap-spacing-300 text-content-standard-secondary text-label leading-7">
          {renderContent()}
        </div>
      </div>

      {needsExpansion && (
        <div
          className={`${
            isExpanded
              ? "relative flex justify-start pt-spacing-300"
              : "description-fade absolute right-0 bottom-0 left-0 flex h-24 items-end justify-start pb-spacing-50"
          }`}>
          <button
            ref={buttonRef}
            type="button"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-controls={contentId}
            className="font-medium font-mono text-content-standard-tertiary text-footnote uppercase tracking-widest transition-colors hover:text-content-standard-primary focus-visible:rounded-radius-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
            {isExpanded ? "접기 −" : "더보기 +"}
          </button>
        </div>
      )}
    </div>
  );
}
