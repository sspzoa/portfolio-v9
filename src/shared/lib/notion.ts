const NOTION_API_VERSION = "2025-09-03";
const NOTION_BASE_URL = "https://api.notion.com/v1";

export class NotionError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "NotionError";
    this.status = status;
  }
}

export async function notionRequest<T>(
  endpoint: string,
  options?: {
    method?: string;
    body?: Record<string, unknown>;
  },
): Promise<T> {
  const token = process.env.NOTION_TOKEN;
  if (!token) {
    throw new NotionError("NOTION_TOKEN environment variable is not configured", 500);
  }

  const fetchOptions: RequestInit = {
    method: options?.method || "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_API_VERSION,
      "Content-Type": "application/json",
    },
  };

  if (options?.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${NOTION_BASE_URL}${endpoint}`, fetchOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new NotionError(errorData?.message || `Notion API error: ${response.status}`, response.status);
  }

  return response.json();
}
