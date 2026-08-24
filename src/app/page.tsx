import Link from "next/link";
import { Footer } from "@/features/footer";
import { Socials } from "@/features/socials";

const AFFILIATIONS = [
  { label: "work", value: "HORANG EDU Corp." },
  { label: "school", value: "DGU Business School '26" },
  { label: "alumni", value: "KDMHS Hacking Defence 22nd" },
] as const;

const focusRing =
  "focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-content flex-col px-spacing-500 py-spacing-700 md:px-spacing-700 md:py-spacing-800 lg:px-spacing-800">
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col">
        <p aria-hidden="true" className="font-mono text-content-standard-tertiary text-label">
          $ whoami
        </p>
        <h1 className="mt-spacing-400 font-bold text-content-standard-primary text-hero">
          Seungpyo Suh<span className="text-content-standard-quaternary">_</span>
        </h1>
        <p className="mt-spacing-300 text-body text-content-standard-secondary">Product Engineer</p>

        <dl className="mt-spacing-850 flex flex-col md:mt-spacing-1000">
          {AFFILIATIONS.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-1 items-baseline gap-x-spacing-700 gap-y-spacing-100 border-line-divider border-t py-spacing-400 first:border-t-0 first:pt-0 md:grid-cols-[120px_1fr]">
              <dt className="font-mono text-content-standard-tertiary text-footnote">{`## ${item.label}`}</dt>
              <dd className="flex items-baseline gap-spacing-200 text-content-standard-primary text-label">
                <span aria-hidden="true" className="shrink-0 select-none font-mono text-content-standard-quaternary">
                  [+]
                </span>
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <nav
          aria-label="Links"
          className="mt-spacing-850 flex flex-col gap-spacing-400 border-line-divider border-t pt-spacing-600 md:mt-spacing-1000">
          <p className="font-mono text-content-standard-tertiary text-footnote">## links</p>
          <Socials />
        </nav>

        <Link
          href="/portfolio"
          className={`mt-spacing-800 inline-flex w-fit items-center rounded-radius-sm border border-line-outline px-spacing-500 py-spacing-150 font-medium font-mono text-content-standard-primary text-label transition-colors duration-fast hover:bg-components-interactive-hover ${focusRing}`}>
          cd /portfolio
        </Link>
      </main>

      <div className="mt-spacing-900">
        <Footer />
      </div>
    </div>
  );
}
