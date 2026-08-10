import Link from "next/link";
import type { ReactNode } from "react";
import { SHELL_LINK_CLASSNAME } from "@/features/docs/primitives";
import { Footer } from "@/features/footer";
import { MobileHeader, SideNav } from "@/features/nav";

export type DocNavItem = { id: string; label: string };

export function DocShell({
  subtitle,
  title,
  lead,
  nav,
  children,
}: {
  subtitle: string;
  title: ReactNode;
  lead: ReactNode;
  nav: readonly DocNavItem[];
  children: ReactNode;
}) {
  const navItems = nav.map(({ id, label }) => ({ id, label }));

  return (
    <div className="mx-auto min-h-dvh w-full max-w-shell px-spacing-500 md:px-spacing-700 lg:px-spacing-800">
      <MobileHeader items={navItems} />

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-spacing-850">
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-spacing-800">
          <div className="flex flex-col gap-spacing-150">
            <Link href="#top" className="font-semibold text-content-standard-primary text-label tracking-tight">
              Seungpyo Suh<span className="text-core-accent">.</span>
            </Link>
            <p className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
              {subtitle}
            </p>
          </div>

          <SideNav items={navItems} />

          <div className="flex flex-col gap-spacing-200">
            <Link href="/" className={SHELL_LINK_CLASSNAME}>
              ← Portfolio
            </Link>
            <Link href="/design-system" className={SHELL_LINK_CLASSNAME}>
              Design system
            </Link>
            <Link href="/code-style" className={SHELL_LINK_CLASSNAME}>
              Code style
            </Link>
          </div>
        </aside>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-w-0 max-w-content flex-col py-spacing-700 md:py-spacing-800">
          <header id="top" className="flex scroll-mt-spacing-800 flex-col gap-spacing-500 pb-spacing-200">
            <div className="flex flex-wrap items-center justify-end gap-x-spacing-300 gap-y-spacing-100 lg:hidden">
              <Link href="/" className={SHELL_LINK_CLASSNAME}>
                ← Portfolio
              </Link>
              <span aria-hidden="true" className="font-mono text-content-standard-quaternary text-footnote">
                ·
              </span>
              <Link href="/design-system" className={SHELL_LINK_CLASSNAME}>
                Design
              </Link>
              <span aria-hidden="true" className="font-mono text-content-standard-quaternary text-footnote">
                ·
              </span>
              <Link href="/code-style" className={SHELL_LINK_CLASSNAME}>
                Code
              </Link>
            </div>
            <h1 className="font-semibold text-content-standard-primary text-hero">{title}</h1>
            <div className="max-w-content text-body text-content-standard-secondary">{lead}</div>
          </header>

          <div className="mt-spacing-850 flex flex-col gap-spacing-850 md:mt-spacing-900 md:gap-spacing-900">
            {children}
          </div>

          <div className="mt-spacing-900">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
