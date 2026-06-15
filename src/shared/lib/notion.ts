import { env } from "@/shared/lib/env";

const NOTION_API_VERSION = "2025-09-03";
const NOTION_BASE_URL = "https://api.notion.com/v1";

const MAX_RETRIES = 3;
const REQUEST_TIMEOUT_MS = 15000;
const INITIAL_BACKOFF_MS = 1000;

export class NotionApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
    public method: string,
    public endpoint: string,
  ) {
    super(`Notion API error: ${status} ${method} ${endpoint}`);
    this.name = "NotionApiError";
  }
}

interface NotionRequestOptions {
  method?: string;
  body?: Record<string, unknown>;
}

function isRetryableStatus(status: number): boolean {
  return status >= 500 || status === 429;
}

function isRetryableError(error: unknown): boolean {
  return error instanceof TypeError || error instanceof DOMException;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function notionRequest<T>(endpoint: string, options?: NotionRequestOptions): Promise<T> {
  const url = `${NOTION_BASE_URL}${endpoint}`;
  const method = options?.method || "GET";
  const fetchOptions: RequestInit = {
    method,
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

  let lastError: unknown;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetchWithTimeout(url, fetchOptions, REQUEST_TIMEOUT_MS);

      if (!response.ok) {
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        throw new NotionApiError(response.status, errorData, method, endpoint);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      lastError = error;

      if (error instanceof NotionApiError) {
        if (!isRetryableStatus(error.status)) {
          throw error;
        }
      } else if (!isRetryableError(error)) {
        throw error;
      }

      const isLastAttempt = attempt === MAX_RETRIES - 1;
      if (isLastAttempt) {
        break;
      }

      const backoffMs = INITIAL_BACKOFF_MS * 2 ** attempt;
      console.warn(
        `Notion request failed (attempt ${attempt + 1}/${MAX_RETRIES}), retrying in ${backoffMs}ms...`,
        error,
      );
      await sleep(backoffMs);
    }
  }

  throw lastError;
}
