import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";
import formatDate from "@/shared/utils/formatDate";

export async function GET() {
  try {
    const notionResponse = await notionRequest<any>(`/data_sources/${process.env.EXPERIENCES_DATA_SOURCE_ID}/query`, {
      method: "POST",
      body: {
        sorts: [
          {
            property: "date",
            direction: "descending",
          },
        ],
      },
    });

    const experiences = notionResponse.results.map((result: any) => ({
      role: result.properties.role.title[0].plain_text,
      organization: result.properties.organization.rich_text[0]?.plain_text,
      description: result.properties.description.rich_text[0]?.plain_text,
      startDate: formatDate(result.properties.date.date.start),
      endDate: formatDate(result.properties.date.date.end),
      logo: result.properties.logo.files[0]?.file.url,
    }));

    return NextResponse.json(experiences);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
