import { createNotionHandler } from "@/shared/lib/createNotionHandler";

export const revalidate = 3600;

interface NotionSkillResult {
  properties: {
    name: { title: Array<{ plain_text: string }> };
    category: { select: { name: string } | null };
    isMain: { checkbox: boolean };
    icon: { files: Array<{ file: { url: string } }> };
  };
  public_url: string;
}

export const GET = createNotionHandler({
  dataSourceEnvKey: "SKILLS_DATA_SOURCE_ID",
  sorts: [
    { property: "category", direction: "ascending" },
    { property: "name", direction: "ascending" },
  ],
  transformResponse: (response) =>
    (response.results as NotionSkillResult[]).map((result) => ({
      name: result.properties.name.title[0]?.plain_text ?? "",
      category: result.properties.category.select?.name ?? "",
      isMain: result.properties.isMain.checkbox,
      icon: result.properties.icon.files[0]?.file?.url ?? "",
      url: result.public_url,
    })),
});
