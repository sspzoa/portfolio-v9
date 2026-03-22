import { NextResponse } from "next/server";
import { NotionError, notionRequest } from "@/shared/lib/notion";

interface NotionSort {
  property: string;
  direction: "ascending" | "descending";
}

interface NotionHandlerConfig<T> {
  dataSourceEnvKey: string;
  sorts?: NotionSort[];
  transformResponse: (response: { results: unknown[] }) => T;
}

export function createNotionHandler<T>(config: NotionHandlerConfig<T>) {
  return async () => {
    const dataSourceId = process.env[config.dataSourceEnvKey];
    if (!dataSourceId) {
      console.error(`Missing environment variable: ${config.dataSourceEnvKey}`);
      return NextResponse.json({ message: "Server configuration error" }, { status: 500 });
    }

    try {
      const response = await notionRequest<{ results: unknown[] }>(`/data_sources/${dataSourceId}/query`, {
        method: "POST",
        body: config.sorts ? { sorts: config.sorts } : undefined,
      });

      const data = config.transformResponse(response);
      return NextResponse.json(data);
    } catch (error) {
      console.error(`API Error [${config.dataSourceEnvKey}]:`, error);

      const status = error instanceof NotionError ? error.status : 500;
      return NextResponse.json({ message: "Failed to fetch data" }, { status });
    }
  };
}
