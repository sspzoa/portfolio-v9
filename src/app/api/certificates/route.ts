import { createNotionHandler } from "@/shared/lib/createNotionHandler";
import formatDate from "@/shared/utils/formatDate";

export const revalidate = 3600;

interface NotionCertificateResult {
  properties: {
    name: { title: Array<{ plain_text: string }> };
    kind: { rich_text: Array<{ plain_text: string }> };
    institution: { rich_text: Array<{ plain_text: string }> };
    date: { date: { start: string } };
  };
}

export const GET = createNotionHandler({
  dataSourceEnvKey: "CERTIFICATES_DATA_SOURCE_ID",
  sorts: [{ property: "date", direction: "descending" }],
  transformResponse: (response) =>
    (response.results as NotionCertificateResult[]).map((result) => ({
      name: result.properties.name.title[0]?.plain_text ?? "",
      kind: result.properties.kind.rich_text[0]?.plain_text ?? "",
      institution: result.properties.institution.rich_text[0]?.plain_text ?? "",
      date: formatDate(result.properties.date.date.start),
    })),
});
