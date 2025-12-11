import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";

export async function GET() {
  try {
    const notionResponse = await notionRequest<any>(
      `/data_sources/${process.env.CERTIFICATIONS_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
      },
    );

    const certifications = notionResponse.results.map((result: any) => ({
      name: result.properties.name.title[0].plain_text,
      kind: result.properties.kind.rich_text[0]?.plain_text,
      institution: result.properties.institution.rich_text[0]?.plain_text,
      date: result.properties.date.date.start,
    }));

    return NextResponse.json(certifications);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
