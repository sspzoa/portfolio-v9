import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";

export async function GET() {
  try {
    const notionResponse = await notionRequest<any>(`/data_sources/${process.env.EDUCATIONS_DATA_SOURCE_ID}/query`, {
      method: "POST",
    });

    const educations = notionResponse.results.map((result: any) => ({
      department: result.properties.department.title[0].plain_text,
      organization: result.properties.organization.rich_text[0]?.plain_text,
      description: result.properties.description.rich_text[0]?.plain_text,
      startDate: result.properties.date.date.start,
      endDate: result.properties.date.date.end,
      logo: result.properties.logo.files[0]?.file.url,
    }));

    return NextResponse.json(educations);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
