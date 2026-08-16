"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export interface NavItem {
  id: string;
  label: string;
}

interface NavProps {
  items: NavItem[];
}

interface MobileHeaderProps extends NavProps {
  brandHref?: string;
}

// Tracks the topmost visible section via IntersectionObserver.
function useActiveSection(items: NavItem[]): string {
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

  return active;
}

// 0 → 1 page scroll progress, rAF-throttled.
function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return progress;
}

export function SideNav({ items }: NavProps) {
  const active = useActiveSection(items);

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
                className="group flex items-center gap-spacing-300 rounded-radius-sm py-spacing-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
                <span
                  aria-hidden="true"
                  className={`h-px shrink-0 transition-all duration-base ${
                    isActive ? "w-6 bg-core-accent" : "w-3 bg-line-outline group-hover:w-5"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`font-mono text-footnote tabular-nums transition-colors ${
                    isActive ? "text-core-accent" : "text-content-standard-quaternary"
                  }`}>
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

// Mobile-only sticky bar: identity, current section, scroll progress. (P2)
export function MobileHeader({ items, brandHref = "#top" }: MobileHeaderProps) {
  const active = useActiveSection(items);
  const progress = useScrollProgress();
  const activeIndex = items.findIndex((item) => item.id === active);
  const activeItem = items[activeIndex];

  return (
    <header className="sticky top-0 z-40 -mx-spacing-500 border-line-divider border-b bg-background-standard-primary/80 backdrop-blur-md md:-mx-spacing-700 lg:hidden">
      <div className="flex h-14 items-center justify-between px-spacing-500 md:px-spacing-700">
        <Link
          href={brandHref}
          className="font-semibold text-content-standard-primary text-label tracking-tight focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
          Seungpyo Suh<span className="text-core-accent">.</span>
        </Link>
        {activeItem && (
          <span className="font-mono text-content-standard-tertiary text-footnote tabular-nums">
            {(activeIndex + 1).toString().padStart(2, "0")} · {activeItem.label}
          </span>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-core-accent transition-[width] duration-fast ease-standard"
        style={{ width: `${progress * 100}%` }}
      />
    </header>
  );
}
