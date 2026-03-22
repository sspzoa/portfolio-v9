import { createNotionHandler } from "@/shared/lib/createNotionHandler";

export const revalidate = 3600;

interface NotionAboutMeResult {
  properties: {
    content: { rich_text: Array<{ plain_text: string }> };
  };
}

export const GET = createNotionHandler({
  dataSourceEnvKey: "ABOUTME_DATA_SOURCE_ID",
  transformResponse: (response) => ({
    content: (response.results[0] as NotionAboutMeResult)?.properties.content.rich_text[0]?.plain_text ?? "",
  }),
});
