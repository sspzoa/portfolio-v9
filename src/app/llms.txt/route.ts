import { formatLlmsTxt } from "@/shared/lib/portfolio-markdown";

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(formatLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=0, must-revalidate",
    },
  });
}
