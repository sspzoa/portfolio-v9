import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";
import formatDate from "@/shared/utils/formatDate";

export async function GET() {
  try {
    const response = await notionRequest<any>(`/data_sources/${process.env.ACTIVITIES_DATA_SOURCE_ID}/query`, {
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

    const activities = response.results.map((result: any) => ({
      name: result.properties.name.title[0].plain_text,
      role: result.properties.role.select.name,
      hosts: result.properties.host.multi_select.map((h: any) => h.name),
      startDate: formatDate(result.properties.date.date.start),
      endDate: formatDate(result.properties.date.date.end),
    }));

    return NextResponse.json(activities);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
