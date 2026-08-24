"use client";

import type React from "react";
import { useEffect, useId, useRef, useState } from "react";

interface CollapsibleProps {
  children: React.ReactNode;
  maxHeight: number;
}

export function Collapsible({ children, maxHeight }: CollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentId = useId();

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    let animationFrame: number;

    const checkHeight = () => {
      const node = contentRef.current;
      if (!node || node.getClientRects().length === 0) return;
      setContentHeight(node.scrollHeight);
      setNeedsExpansion(node.scrollHeight > maxHeight);
    };

    const scheduleCheck = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(checkHeight);
    };

    checkHeight();

    const resizeObserver = new ResizeObserver(scheduleCheck);
    resizeObserver.observe(el);
    window.addEventListener("resize", scheduleCheck);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleCheck);
      cancelAnimationFrame(animationFrame);
    };
  }, [maxHeight]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  };

  return (
    <div className="relative">
      <div
        ref={contentRef}
        id={contentId}
        className="overflow-hidden transition-[max-height] duration-slow ease-standard"
        style={{
          maxHeight: needsExpansion ? (isExpanded ? contentHeight : maxHeight) : undefined,
        }}>
        {children}
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
            className="font-medium font-mono text-content-standard-tertiary text-footnote transition-colors duration-fast hover:text-content-standard-primary focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
            {isExpanded ? "[-] 접기" : "[+] 더보기"}
          </button>
        </div>
      )}
    </div>
  );
}
