"use client";

import type React from "react";
import { useEffect, useId, useRef, useState } from "react";

interface CollapsibleProps {
  children: React.ReactNode;
  maxHeight: number;
}

// Client wrapper that clamps tall content to maxHeight behind a 더보기/접기 toggle.
export function Collapsible({ children, maxHeight }: CollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentId = useId();

  useEffect(() => {
    let animationFrame: number;

    const checkHeight = () => {
      if (contentRef.current) {
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
  }, [maxHeight]);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
    // Return focus to the toggle button after React re-renders the new label.
    requestAnimationFrame(() => {
      buttonRef.current?.focus();
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
            className="font-medium font-mono text-content-standard-tertiary text-footnote uppercase tracking-widest transition-colors hover:text-content-standard-primary focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
            {isExpanded ? "접기 −" : "더보기 +"}
          </button>
        </div>
      )}
    </div>
  );
}
