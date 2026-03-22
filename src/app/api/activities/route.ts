import { createNotionHandler } from "@/shared/lib/createNotionHandler";
import formatDate from "@/shared/utils/formatDate";

export const revalidate = 3600;

interface NotionActivityResult {
  properties: {
    name: { title: Array<{ plain_text: string }> };
    role: { select: { name: string } };
    host: { multi_select: Array<{ name: string }> };
    date: { date: { start: string; end: string | null } };
  };
}

export const GET = createNotionHandler({
  dataSourceEnvKey: "ACTIVITIES_DATA_SOURCE_ID",
  sorts: [{ property: "date", direction: "descending" }],
  transformResponse: (response) =>
    (response.results as NotionActivityResult[]).map((result) => ({
      name: result.properties.name.title[0]?.plain_text ?? "",
      role: result.properties.role.select.name,
      hosts: result.properties.host.multi_select.map((h) => h.name),
      startDate: formatDate(result.properties.date.date.start),
      endDate: formatDate(result.properties.date.date.end),
    })),
});
