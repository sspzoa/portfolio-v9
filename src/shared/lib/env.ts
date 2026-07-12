import { z } from "zod";

const NOTION_TOKEN_REGEX = /^secret_[A-Za-z0-9_-]+$/;

const envSchema = z.object({
  NOTION_TOKEN: z.string().regex(NOTION_TOKEN_REGEX, "NOTION_TOKEN must be a valid Notion integration token"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
  throw new Error(`Environment variable validation failed:\n${issues}`);
}

const DATA_SOURCE_IDS = {
  ABOUTME_DATA_SOURCE_ID: "25fcc9b7-2a9c-80f4-a759-000b59d1f09f",
  ACTIVITIES_DATA_SOURCE_ID: "889a539f-82dc-4f83-ab36-340172a96423",
  AWARDS_DATA_SOURCE_ID: "405fc2ab-6a7e-4a82-ad81-32a95f57fc60",
  CAREERS_DATA_SOURCE_ID: "2c6cc9b7-2a9c-81fa-acfd-000bdde3a07f",
  CERTIFICATES_DATA_SOURCE_ID: "3cedc9df-03cd-4f10-ba58-0285dee8c4c1",
  EDUCATIONS_DATA_SOURCE_ID: "2c6cc9b7-2a9c-8170-8a33-000bb91df281",
  EXPERIENCES_DATA_SOURCE_ID: "b67f0d03-5df5-4cb4-a3e6-0b3e05cf744a",
  PROJECTS_DATA_SOURCE_ID: "4314b88e-8d9d-4c21-b890-4ae84eeb9998",
  SKILLS_DATA_SOURCE_ID: "6ea68ec8-532c-4499-9eb7-1ea85b91440b",
} as const;

export const env = {
  ...parsed.data,
  ...DATA_SOURCE_IDS,
};
