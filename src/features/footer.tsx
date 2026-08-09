import Link from "next/link";

const linkClassName =
  "font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-col gap-spacing-400 border-line-divider border-t pt-spacing-700">
      <nav aria-label="Alternate views" className="flex flex-wrap items-center gap-x-spacing-200 gap-y-spacing-100">
        <Link href="/design-system" className={linkClassName}>
          design system
        </Link>
        <span aria-hidden="true" className="font-mono text-content-standard-quaternary text-footnote">
          ·
        </span>
        <Link href="/machine-readable" className={linkClassName}>
          machine-readable
        </Link>
      </nav>
      <div className="flex flex-col gap-spacing-150">
        <p className="font-medium font-mono text-content-standard-tertiary text-footnote uppercase tracking-widest">
          Designed & built by Seungpyo Suh
        </p>
        <p className="font-mono text-content-standard-quaternary text-footnote">
          © <time dateTime="2023">2023</time>–<time dateTime={String(currentYear)}>{currentYear}</time> · All rights
          reserved
        </p>
      </div>
    </footer>
  );
}
