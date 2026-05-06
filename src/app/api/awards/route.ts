import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";
import formatDate from "@/shared/utils/formatDate";

export async function GET() {
  try {
    const notionResponse = await notionRequest<any>(`/data_sources/${process.env.AWARDS_DATA_SOURCE_ID}/query`, {
      method: "POST",
      body: {
        sorts: [
          {
            property: "isPinned",
            direction: "descending",
          },
          {
            property: "date",
            direction: "descending",
          },
        ],
      },
    });

    const awards = notionResponse.results.map((result: any) => ({
      name: result.properties.name.title[0].plain_text,
      tier: result.properties.tier.rich_text[0]?.plain_text,
      date: formatDate(result.properties.date.date.start),
      isPinned: result.properties.isPinned.checkbox,
    }));

    return NextResponse.json(awards);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
