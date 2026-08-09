import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/features/footer";
import { getPortfolioData } from "@/shared/lib/portfolio-data";
import { formatPortfolioMarkdown } from "@/shared/lib/portfolio-markdown";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "machine-readable · Seungpyo Suh",
  description: "Plain Markdown résumé optimized for machines, LLMs, and text readers.",
  alternates: {
    canonical: "https://sspzoa.io/machine-readable",
    types: {
      "text/markdown": "https://sspzoa.io/llms-full.txt",
      "text/plain": "https://sspzoa.io/llms.txt",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

const navLinkClassName =
  "font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";

export default async function MachineReadablePage() {
  let markdown: string;
  let errorMessage: string | null = null;

  try {
    const data = await getPortfolioData();
    markdown = formatPortfolioMarkdown(data);
  } catch (error) {
    console.error("[MachineReadablePage]", error);
    markdown = "";
    errorMessage = "포트폴리오 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.";
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-content px-spacing-500 py-spacing-700 md:px-spacing-700 md:py-spacing-800">
      <header className="mb-spacing-700 flex flex-col gap-spacing-400 border-line-divider border-b pb-spacing-600">
        <div className="flex flex-wrap items-baseline justify-between gap-spacing-400">
          <p className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
            machine-readable
          </p>
          <nav aria-label="Related views" className="flex flex-wrap items-center gap-x-spacing-200 gap-y-spacing-100">
            <Link href="/" className={navLinkClassName}>
              Portfolio
            </Link>
            <span aria-hidden="true" className="font-mono text-content-standard-quaternary text-footnote">
              ·
            </span>
            <Link href="/llms-full.txt" className={navLinkClassName}>
              llms-full.txt
            </Link>
            <span aria-hidden="true" className="font-mono text-content-standard-quaternary text-footnote">
              ·
            </span>
            <Link href="/llms.txt" className={navLinkClassName}>
              llms.txt
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-spacing-200">
          <h1 className="font-semibold text-content-standard-primary text-heading tracking-tight">
            Seungpyo Suh<span className="text-core-accent">.</span>
          </h1>
          <p className="text-body text-content-standard-secondary">
            Notion CMS 콘텐츠를 마크다운 한 장으로 정리한 뷰입니다. LLM·크롤러는{" "}
            <Link href="/llms-full.txt" className="text-core-accent-strong underline-offset-2 hover:underline">
              /llms-full.txt
            </Link>
            를 우선 사용하세요.
          </p>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        {errorMessage ? (
          <p className="text-content-standard-secondary text-label">{errorMessage}</p>
        ) : (
          <pre className="overflow-x-auto whitespace-pre-wrap break-words font-mono text-content-standard-primary text-label leading-relaxed">
            {markdown}
          </pre>
        )}
      </main>

      <div className="mt-spacing-900">
        <Footer />
      </div>
    </div>
  );
}
