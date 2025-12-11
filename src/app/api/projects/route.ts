import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";

export async function GET() {
  try {
    const notionResponse = await notionRequest<any>(`/data_sources/${process.env.PROJECTS_DATA_SOURCE_ID}/query`, {
      method: "POST",
      body: {
        sorts: [
          {
            property: "isSideProject",
            direction: "ascending",
          },
          {
            property: "score",
            direction: "descending",
          },
          {
            property: "startDate",
            direction: "descending",
          },
        ],
      },
    });

    const projects = notionResponse.results.map((result: any) => ({
      name: result.properties.name.title[0].plain_text,
      shortDescription: result.properties.shortDescription.rich_text[0]?.plain_text,
      description: result.properties.description.rich_text[0]?.plain_text,
      startDate: result.properties.workPeriod.date.start,
      endDate: result.properties.workPeriod.date.end,
      teamSize: result.properties.teamSize.number,
      isSideProject: result.properties.isSideProject.checkbox,
      tags: result.properties.tags.multi_select.map((tag: any) => tag.name),
      score: result.properties.score.number,
      coverImage: result.cover?.file?.url,
      iconImage: result.icon?.file?.url,
    }));

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
