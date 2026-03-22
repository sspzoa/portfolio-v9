import { createNotionHandler } from "@/shared/lib/createNotionHandler";
import formatDate from "@/shared/utils/formatDate";

export const revalidate = 3600;

interface NotionExperienceResult {
  properties: {
    role: { title: Array<{ plain_text: string }> };
    organization: { rich_text: Array<{ plain_text: string }> };
    description: { rich_text: Array<{ plain_text: string }> };
    date: { date: { start: string; end: string | null } };
    logo: { files: Array<{ file: { url: string } }> };
  };
}

export const GET = createNotionHandler({
  dataSourceEnvKey: "EXPERIENCES_DATA_SOURCE_ID",
  sorts: [{ property: "date", direction: "descending" }],
  transformResponse: (response) =>
    (response.results as NotionExperienceResult[]).map((result) => ({
      role: result.properties.role.title[0]?.plain_text ?? "",
      organization: result.properties.organization.rich_text[0]?.plain_text ?? "",
      description: result.properties.description.rich_text[0]?.plain_text ?? "",
      startDate: formatDate(result.properties.date.date.start),
      endDate: formatDate(result.properties.date.date.end),
      logo: result.properties.logo.files[0]?.file?.url ?? "",
    })),
});
