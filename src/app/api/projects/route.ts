import { createNotionHandler } from "@/shared/lib/createNotionHandler";
import formatDate from "@/shared/utils/formatDate";

export const revalidate = 3600;

interface NotionProjectResult {
  properties: {
    name: { title: Array<{ plain_text: string }> };
    shortDescription: { rich_text: Array<{ plain_text: string }> };
    description: { rich_text: Array<{ plain_text: string }> };
    workPeriod: { date: { start: string; end: string | null } };
    teamSize: { number: number };
    isSideProject: { checkbox: boolean };
    tags: { multi_select: Array<{ name: string }> };
    score: { number: number };
  };
  cover: { file: { url: string } } | null;
  icon: { file: { url: string } } | null;
}

export const GET = createNotionHandler({
  dataSourceEnvKey: "PROJECTS_DATA_SOURCE_ID",
  sorts: [
    { property: "isSideProject", direction: "ascending" },
    { property: "score", direction: "descending" },
    { property: "workPeriod", direction: "descending" },
  ],
  transformResponse: (response) =>
    (response.results as NotionProjectResult[]).map((result) => ({
      name: result.properties.name.title[0]?.plain_text ?? "",
      shortDescription: result.properties.shortDescription.rich_text[0]?.plain_text,
      description: result.properties.description.rich_text[0]?.plain_text,
      startDate: formatDate(result.properties.workPeriod.date.start),
      endDate: formatDate(result.properties.workPeriod.date.end),
      teamSize: result.properties.teamSize.number,
      isSideProject: result.properties.isSideProject.checkbox,
      tags: result.properties.tags.multi_select.map((tag) => tag.name),
      score: result.properties.score.number,
      coverImage: result.cover?.file?.url,
      iconImage: result.icon?.file?.url,
    })),
});
