import { env } from "@/shared/lib/env";

const NOTION_API_VERSION = "2025-09-03";
const NOTION_BASE_URL = "https://api.notion.com/v1";

export class NotionApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
  ) {
    super(`Notion API error: ${status}`);
    this.name = "NotionApiError";
  }
}

interface NotionRequestOptions {
  method?: string;
  body?: Record<string, unknown>;
}

export async function notionRequest<T>(endpoint: string, options?: NotionRequestOptions): Promise<T> {
  const fetchOptions: RequestInit = {
    method: options?.method || "GET",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": NOTION_API_VERSION,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  };

  if (options?.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${NOTION_BASE_URL}${endpoint}`, fetchOptions);

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }
    throw new NotionApiError(response.status, errorData);
  }

  return response.json() as Promise<T>;
}
