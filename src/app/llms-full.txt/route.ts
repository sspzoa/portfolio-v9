import { getPortfolioData } from "@/shared/lib/portfolio-data";
import { formatPortfolioMarkdown } from "@/shared/lib/portfolio-markdown";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getPortfolioData();
    const markdown = formatPortfolioMarkdown(data);

    return new Response(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Cache-Control": "public, s-maxage=0, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[llms-full.txt]", error);
    return new Response("Failed to load portfolio data.\n", {
      status: 502,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}
