"use client";

import { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
}

interface SideNavProps {
  items: NavItem[];
}

export function SideNav({ items }: SideNavProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActive(topmost.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    for (const section of sections) {
      observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Sections">
      <ul className="flex flex-col gap-spacing-50">
        {items.map((item, i) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className="group flex items-center gap-spacing-300 rounded-radius-200 py-spacing-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
                <span
                  aria-hidden="true"
                  className={`h-px shrink-0 transition-all duration-300 ${
                    isActive ? "w-6 bg-core-accent" : "w-3 bg-line-outline group-hover:w-5"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="font-mono text-content-standard-quaternary text-footnote tabular-nums">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <span
                  className={`font-mono text-footnote transition-colors ${
                    isActive
                      ? "text-content-standard-primary"
                      : "text-content-standard-tertiary group-hover:text-content-standard-secondary"
                  }`}>
                  {item.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
