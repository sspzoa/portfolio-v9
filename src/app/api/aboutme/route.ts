import { NextResponse } from "next/server";
import { notionRequest } from "@/shared/lib/notion";

export async function GET() {
  try {
    const response = await notionRequest<any>(`/data_sources/${process.env.ABOUTME_DATA_SOURCE_ID}/query`, {
      method: "POST",
    });

    const aboutme = {
      content: response.results[0].properties.content.rich_text[0]?.plain_text,
    };

    return NextResponse.json(aboutme);
  } catch (error: any) {
    return NextResponse.json(error.data || { message: error.message }, {
      status: (error.status as number) || 500,
    });
  }
}
