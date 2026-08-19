import Link from "next/link";
import { Socials } from "@/features/socials";

export default function Home() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-spacing-500 py-spacing-800">
      <main id="main-content" tabIndex={-1} className="flex flex-col items-center text-center">
        <h1 className="font-semibold text-content-standard-primary text-title tracking-tight">
          Seungpyo Suh<span className="text-core-accent">.</span>
        </h1>
        <p className="mt-spacing-150 font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
          Product Engineer
        </p>
        <p className="mt-spacing-400 text-content-standard-tertiary text-label">
          HORANG EDU Corp.
          <br />
          DGU Business School '26
          <br />
          KDMHS Hacking Defence 22nd
        </p>

        <Socials className="mt-spacing-700 justify-center" />
        <Link
          href="/portfolio"
          className="mt-spacing-400 font-mono text-content-standard-tertiary text-footnote uppercase tracking-wider transition-colors duration-fast hover:text-content-standard-primary focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
          Portfolio
        </Link>
      </main>
    </div>
  );
}
