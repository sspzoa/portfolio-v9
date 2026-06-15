import { z } from "zod";

const NOTION_TOKEN_REGEX = /^secret_[A-Za-z0-9_-]+$/;

const envSchema = z.object({
  NOTION_TOKEN: z.string().regex(NOTION_TOKEN_REGEX, "NOTION_TOKEN must be a valid Notion integration token"),
  ABOUTME_DATA_SOURCE_ID: z.string().uuid("ABOUTME_DATA_SOURCE_ID must be a valid UUID"),
  ACTIVITIES_DATA_SOURCE_ID: z.string().uuid("ACTIVITIES_DATA_SOURCE_ID must be a valid UUID"),
  AWARDS_DATA_SOURCE_ID: z.string().uuid("AWARDS_DATA_SOURCE_ID must be a valid UUID"),
  CAREERS_DATA_SOURCE_ID: z.string().uuid("CAREERS_DATA_SOURCE_ID must be a valid UUID"),
  CERTIFICATES_DATA_SOURCE_ID: z.string().uuid("CERTIFICATES_DATA_SOURCE_ID must be a valid UUID"),
  EDUCATIONS_DATA_SOURCE_ID: z.string().uuid("EDUCATIONS_DATA_SOURCE_ID must be a valid UUID"),
  EXPERIENCES_DATA_SOURCE_ID: z.string().uuid("EXPERIENCES_DATA_SOURCE_ID must be a valid UUID"),
  PROJECTS_DATA_SOURCE_ID: z.string().uuid("PROJECTS_DATA_SOURCE_ID must be a valid UUID"),
  SKILLS_DATA_SOURCE_ID: z.string().uuid("SKILLS_DATA_SOURCE_ID must be a valid UUID"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
  throw new Error(`Environment variable validation failed:\n${issues}`);
}

export const env = parsed.data;
