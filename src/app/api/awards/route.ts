import { createNotionHandler } from "@/shared/lib/createNotionHandler";
import formatDate from "@/shared/utils/formatDate";

export const revalidate = 3600;

interface NotionAwardResult {
  properties: {
    name: { title: Array<{ plain_text: string }> };
    tier: { rich_text: Array<{ plain_text: string }> };
    date: { date: { start: string } };
    score: { number: number };
  };
}

export const GET = createNotionHandler({
  dataSourceEnvKey: "AWARDS_DATA_SOURCE_ID",
  sorts: [{ property: "score", direction: "descending" }],
  transformResponse: (response) =>
    (response.results as NotionAwardResult[]).map((result) => ({
      name: result.properties.name.title[0]?.plain_text ?? "",
      tier: result.properties.tier.rich_text[0]?.plain_text ?? "",
      date: formatDate(result.properties.date.date.start),
      score: result.properties.score.number,
    })),
});
