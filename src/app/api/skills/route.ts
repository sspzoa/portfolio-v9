import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";

export async function GET() {
  try {
    const notionResponse = await notionRequest<any>(`/data_sources/${process.env.SKILLS_DATA_SOURCE_ID}/query`, {
      method: "POST",
      body: {
        sorts: [
          {
            property: "category",
            direction: "ascending",
          },
          {
            property: "name",
            direction: "ascending",
          },
        ],
      },
    });

    const skills = notionResponse.results.map((result: any) => ({
      name: result.properties.name.title[0].plain_text,
      category: result.properties.category.select?.name,
      isMain: result.properties.isMain.checkbox,
      icon: result.properties.icon.files[0]?.file?.url,
      url: result.public_url,
    }));

    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
