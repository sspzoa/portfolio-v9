"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useRef, useState } from "react";

interface DescriptionProps {
  children: React.ReactNode;
  maxHeight?: number;
}

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

  const parseText = (text: string): React.ReactNode[] => {
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
            className="font-semibold text-solid-blue underline">
            {linkText}
          </Link>
        );
      }

      return part;
    });
  };

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded || !needsExpansion ? (contentRef.current?.scrollHeight ?? "none") : maxHeight,
        }}>
        <p className="whitespace-pre-wrap text-content-standard-secondary text-label leading-spacing-600">
          {typeof children === "string" ? parseText(children) : children}
        </p>
      </div>

      {needsExpansion && (
        <>
          {!isExpanded && (
            <div
              className="absolute right-0 bottom-0 left-0 flex h-24 items-center justify-center"
              style={{
                background: "linear-gradient(to top, var(--components-fill-standard-primary), transparent)",
              }}>
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer font-medium text-label transition-colors"
                style={{
                  color: "var(--content-standard-tertiary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--content-standard-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--content-standard-tertiary)";
                }}>
                더보기
              </button>
            </div>
          )}
          {isExpanded && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="cursor-pointer font-medium text-label transition-colors"
                style={{
                  color: "var(--content-standard-tertiary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--content-standard-secondary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--content-standard-tertiary)";
                }}>
                접기
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
