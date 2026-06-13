import { z } from "zod";

const envSchema = z.object({
  NOTION_TOKEN: z.string().min(1, "NOTION_TOKEN is required"),
  ABOUTME_DATA_SOURCE_ID: z.string().min(1, "ABOUTME_DATA_SOURCE_ID is required"),
  ACTIVITIES_DATA_SOURCE_ID: z.string().min(1, "ACTIVITIES_DATA_SOURCE_ID is required"),
  AWARDS_DATA_SOURCE_ID: z.string().min(1, "AWARDS_DATA_SOURCE_ID is required"),
  CAREERS_DATA_SOURCE_ID: z.string().min(1, "CAREERS_DATA_SOURCE_ID is required"),
  CERTIFICATES_DATA_SOURCE_ID: z.string().min(1, "CERTIFICATES_DATA_SOURCE_ID is required"),
  EDUCATIONS_DATA_SOURCE_ID: z.string().min(1, "EDUCATIONS_DATA_SOURCE_ID is required"),
  EXPERIENCES_DATA_SOURCE_ID: z.string().min(1, "EXPERIENCES_DATA_SOURCE_ID is required"),
  PROJECTS_DATA_SOURCE_ID: z.string().min(1, "PROJECTS_DATA_SOURCE_ID is required"),
  SKILLS_DATA_SOURCE_ID: z.string().min(1, "SKILLS_DATA_SOURCE_ID is required"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("\n");
  throw new Error(`Environment variable validation failed:\n${issues}`);
}

export const env = parsed.data;
