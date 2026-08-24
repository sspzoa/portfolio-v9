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

const focusRing =
  "focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";

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

export function Contents({ items }: NavProps) {
  const active = useActiveSection(items);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Sections">
      <p className="font-mono text-content-standard-tertiary text-footnote">## contents</p>
      <ul className="mt-spacing-400 flex flex-col">
        {items.map((item, i) => {
          const isActive = active === item.id;
          const index = (i + 1).toString().padStart(2, "0");
          return (
            <li key={item.id} className="border-line-divider border-t first:border-t-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={`flex items-baseline gap-spacing-200 py-spacing-200 ${focusRing}`}>
                <span
                  aria-hidden="true"
                  className={`w-spacing-300 shrink-0 select-none font-mono text-footnote ${
                    isActive ? "text-content-standard-primary" : "text-content-standard-quaternary"
                  }`}>
                  {isActive ? ">" : ""}
                </span>
                <span
                  className={`font-mono text-footnote tabular-nums ${
                    isActive ? "text-content-standard-primary" : "text-content-standard-quaternary"
                  }`}>
                  {`[${index}]`}
                </span>
                <span
                  className={`font-mono text-footnote ${
                    isActive
                      ? "font-bold text-content-standard-primary"
                      : "text-content-standard-tertiary hover:text-content-standard-secondary"
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

export function MobileHeader({ items, brandHref = "/" }: MobileHeaderProps) {
  const active = useActiveSection(items);
  const progress = useScrollProgress();
  const activeIndex = items.findIndex((item) => item.id === active);
  const activeItem = items[activeIndex];

  return (
    <header className="sticky top-0 z-40 -mx-spacing-500 border-line-divider border-b bg-background-standard-primary md:-mx-spacing-700 lg:hidden">
      <div className="flex h-14 items-center justify-between px-spacing-500 md:px-spacing-700">
        <Link href={brandHref} className={`font-mono text-content-standard-primary text-footnote ${focusRing}`}>
          cd /
        </Link>
        {activeItem && (
          <span className="font-mono text-content-standard-tertiary text-footnote tabular-nums">
            {`[${(activeIndex + 1).toString().padStart(2, "0")}] ${activeItem.label}`}
          </span>
        )}
      </div>
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px bg-line-outline transition-[width] duration-fast ease-standard"
        style={{ width: `${progress * 100}%` }}
      />
    </header>
  );
}
