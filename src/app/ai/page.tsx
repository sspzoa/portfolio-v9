import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolioData } from "@/shared/lib/portfolio-data";
import { formatPortfolioMarkdown } from "@/shared/lib/portfolio-markdown";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "machine-readable · Seungpyo Suh",
  description: "Plain Markdown résumé optimized for machines, LLMs, and text readers.",
  alternates: {
    canonical: "https://sspzoa.io/ai",
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

export default async function AiPage() {
  let markdown: string;
  let errorMessage: string | null = null;

  try {
    const data = await getPortfolioData();
    markdown = formatPortfolioMarkdown(data);
  } catch (error) {
    console.error("[AiPage]", error);
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
          <nav className="flex flex-wrap gap-x-spacing-500 gap-y-spacing-200 font-mono text-footnote">
            <Link
              href="/"
              className="text-content-standard-secondary transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
              Designed site
            </Link>
            <Link
              href="/llms-full.txt"
              className="text-content-standard-secondary transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
              Raw Markdown
            </Link>
            <Link
              href="/llms.txt"
              className="text-content-standard-secondary transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
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
    </div>
  );
}
