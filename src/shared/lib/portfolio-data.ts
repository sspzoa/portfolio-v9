import { env } from "@/shared/lib/env";
import { NotionApiError, notionRequest } from "@/shared/lib/notion";
import type {
  NotionAboutMePage,
  NotionActivityPage,
  NotionAwardPage,
  NotionCareerPage,
  NotionCertificatePage,
  NotionEducationPage,
  NotionExperiencePage,
  NotionFileProperty,
  NotionProjectPage,
  NotionSkillPage,
} from "@/shared/lib/notion-types";
import {
  aboutMeSchema,
  activitySchema,
  awardSchema,
  careerSchema,
  certificationSchema,
  educationSchema,
  experienceSchema,
  projectSchema,
  skillSchema,
} from "@/shared/schemas";
import type {
  AboutMe,
  Activity,
  Award,
  Career,
  Certification,
  Education,
  Experience,
  Project,
  Skill,
} from "@/shared/types";
import formatDate from "@/shared/utils/formatDate";

export class DataValidationError extends Error {
  constructor(
    message: string,
    public readonly cause: unknown,
  ) {
    super(message);
    this.name = "DataValidationError";
  }
}

export class DataFetchError extends Error {
  constructor(
    message: string,
    public readonly cause: unknown,
  ) {
    super(message);
    this.name = "DataFetchError";
  }
}

export function isConfigError(error: unknown): boolean {
  if (!(error instanceof DataFetchError)) return false;
  if (error.cause instanceof NotionApiError) {
    return error.cause.status >= 400 && error.cause.status < 500;
  }
  return false;
}

function getFileUrl(file: NotionFileProperty | null | undefined): string | null {
  if (!file) return null;
  return file.type === "external" ? file.external.url : file.file.url;
}

function getPageIconUrl(page: NotionProjectPage): string | null {
  if (!page.icon) return null;
  return page.icon.type === "emoji" ? null : getFileUrl(page.icon);
}

export interface PortfolioData {
  aboutMe: AboutMe;
  awards: Award[];
  certificates: Certification[];
  skills: Skill[];
  careers: Career[];
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  activities: Activity[];
}

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const response = await notionRequest<{ results: NotionSkillPage[] }>(
      `/data_sources/${env.SKILLS_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [
            { property: "category", direction: "ascending" },
            { property: "name", direction: "ascending" },
          ],
        },
      },
    );

    const skills = response.results.map((result) => ({
      id: result.id,
      name: result.properties.name.title[0]?.plain_text ?? "",
      category: result.properties.category.select?.name ?? "",
      isMain: result.properties.isMain.checkbox,
      icon: getFileUrl(result.properties.icon.files[0]),
      url: result.public_url,
    }));

    return skillSchema.array().parse(skills);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch skills", error);
    }
    throw new DataValidationError("Skills data validation failed", error);
  }
}

export async function fetchProjects(): Promise<Project[]> {
  try {
    const response = await notionRequest<{ results: NotionProjectPage[] }>(
      `/data_sources/${env.PROJECTS_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [
            { property: "isSideProject", direction: "ascending" },
            { property: "workPeriod", direction: "descending" },
          ],
        },
      },
    );

    const projects = response.results.map((result) => ({
      id: result.id,
      name: result.properties.name.title[0]?.plain_text ?? "",
      shortDescription: result.properties.shortDescription.rich_text[0]?.plain_text ?? null,
      description: result.properties.description.rich_text[0]?.plain_text ?? null,
      startDate: formatDate(result.properties.workPeriod.date?.start),
      endDate: formatDate(result.properties.workPeriod.date?.end),
      teamSize: result.properties.teamSize.number,
      isSideProject: result.properties.isSideProject.checkbox,
      tags: result.properties.tags.multi_select.map((tag) => tag.name),
      coverImage: getFileUrl(result.cover),
      iconImage: getPageIconUrl(result),
    }));

    return projectSchema.array().parse(projects);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch projects", error);
    }
    throw new DataValidationError("Projects data validation failed", error);
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const response = await notionRequest<{ results: NotionExperiencePage[] }>(
      `/data_sources/${env.EXPERIENCES_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [{ property: "date", direction: "descending" }],
        },
      },
    );

    const experiences = response.results.map((result) => ({
      id: result.id,
      role: result.properties.role.title[0]?.plain_text ?? "",
      organization: result.properties.organization.rich_text[0]?.plain_text ?? null,
      description: result.properties.description.rich_text[0]?.plain_text ?? null,
      startDate: formatDate(result.properties.date.date?.start),
      endDate: formatDate(result.properties.date.date?.end),
      logo: getFileUrl(result.properties.logo.files[0]),
    }));

    return experienceSchema.array().parse(experiences);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch experiences", error);
    }
    throw new DataValidationError("Experiences data validation failed", error);
  }
}

export async function fetchCareers(): Promise<Career[]> {
  try {
    const response = await notionRequest<{ results: NotionCareerPage[] }>(
      `/data_sources/${env.CAREERS_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [{ property: "date", direction: "descending" }],
        },
      },
    );

    const careers = response.results.map((result) => ({
      id: result.id,
      role: result.properties.role.title[0]?.plain_text ?? "",
      organization: result.properties.organization.rich_text[0]?.plain_text ?? null,
      description: result.properties.description.rich_text[0]?.plain_text ?? null,
      startDate: formatDate(result.properties.date.date?.start),
      endDate: formatDate(result.properties.date.date?.end),
      logo: getFileUrl(result.properties.logo.files[0]),
    }));

    return careerSchema.array().parse(careers);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch careers", error);
    }
    throw new DataValidationError("Careers data validation failed", error);
  }
}

export async function fetchEducations(): Promise<Education[]> {
  try {
    const response = await notionRequest<{ results: NotionEducationPage[] }>(
      `/data_sources/${env.EDUCATIONS_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [{ property: "date", direction: "descending" }],
        },
      },
    );

    const educations = response.results.map((result) => ({
      id: result.id,
      department: result.properties.department.title[0]?.plain_text ?? "",
      organization: result.properties.organization.rich_text[0]?.plain_text ?? null,
      description: result.properties.description.rich_text[0]?.plain_text ?? null,
      startDate: formatDate(result.properties.date.date?.start),
      endDate: formatDate(result.properties.date.date?.end),
      logo: getFileUrl(result.properties.logo.files[0]),
    }));

    return educationSchema.array().parse(educations);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch educations", error);
    }
    throw new DataValidationError("Educations data validation failed", error);
  }
}

export async function fetchCertificates(): Promise<Certification[]> {
  try {
    const response = await notionRequest<{ results: NotionCertificatePage[] }>(
      `/data_sources/${env.CERTIFICATES_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [{ property: "date", direction: "descending" }],
        },
      },
    );

    const certifications = response.results.map((result) => ({
      id: result.id,
      name: result.properties.name.title[0]?.plain_text ?? "",
      kind: result.properties.kind.rich_text[0]?.plain_text ?? null,
      institution: result.properties.institution.rich_text[0]?.plain_text ?? null,
      date: formatDate(result.properties.date.date?.start),
    }));

    return certificationSchema.array().parse(certifications);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch certificates", error);
    }
    throw new DataValidationError("Certificates data validation failed", error);
  }
}

export async function fetchAwards(): Promise<Award[]> {
  try {
    const response = await notionRequest<{ results: NotionAwardPage[] }>(
      `/data_sources/${env.AWARDS_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [{ property: "date", direction: "descending" }],
        },
      },
    );

    const awards = response.results.map((result) => ({
      id: result.id,
      name: result.properties.name.title[0]?.plain_text ?? "",
      tier: result.properties.tier.rich_text[0]?.plain_text ?? null,
      date: formatDate(result.properties.date.date?.start),
    }));

    return awardSchema.array().parse(awards);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch awards", error);
    }
    throw new DataValidationError("Awards data validation failed", error);
  }
}

export async function fetchActivities(): Promise<Activity[]> {
  try {
    const response = await notionRequest<{ results: NotionActivityPage[] }>(
      `/data_sources/${env.ACTIVITIES_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
        body: {
          sorts: [{ property: "date", direction: "descending" }],
        },
      },
    );

    const activities = response.results.map((result) => ({
      id: result.id,
      name: result.properties.name.title[0]?.plain_text ?? "",
      role: result.properties.role.select?.name ?? "",
      hosts: result.properties.host.multi_select.map((h) => h.name),
      startDate: formatDate(result.properties.date.date?.start),
      endDate: formatDate(result.properties.date.date?.end),
    }));

    return activitySchema.array().parse(activities);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch activities", error);
    }
    throw new DataValidationError("Activities data validation failed", error);
  }
}

export async function fetchAboutMe(): Promise<AboutMe> {
  try {
    const response = await notionRequest<{ results: NotionAboutMePage[] }>(
      `/data_sources/${env.ABOUTME_DATA_SOURCE_ID}/query`,
      {
        method: "POST",
      },
    );

    const firstResult = response.results[0];
    if (!firstResult) {
      throw new DataFetchError("No AboutMe content found", new Error("Empty results from Notion"));
    }

    const aboutme = {
      content: firstResult.properties.content.rich_text[0]?.plain_text ?? "",
    };

    return aboutMeSchema.parse(aboutme);
  } catch (error) {
    if (error instanceof NotionApiError || error instanceof TypeError || error instanceof DOMException) {
      throw new DataFetchError("Failed to fetch about me", error);
    }
    throw new DataValidationError("AboutMe data validation failed", error);
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const results = await Promise.allSettled([
    fetchAboutMe(),
    fetchAwards(),
    fetchCertificates(),
    fetchSkills(),
    fetchCareers(),
    fetchExperiences(),
    fetchEducations(),
    fetchProjects(),
    fetchActivities(),
  ]);

  const [
    aboutMeResult,
    awardsResult,
    certificatesResult,
    skillsResult,
    careersResult,
    experiencesResult,
    educationsResult,
    projectsResult,
    activitiesResult,
  ] = results;

  const settled = {
    aboutMe: aboutMeResult,
    awards: awardsResult,
    certificates: certificatesResult,
    skills: skillsResult,
    careers: careersResult,
    experiences: experiencesResult,
    educations: educationsResult,
    projects: projectsResult,
    activities: activitiesResult,
  };

  for (const [key, result] of Object.entries(settled)) {
    if (result.status === "rejected") {
      console.error(`[portfolio-data] ${key} failed:`, result.reason);
    }
  }

  if (aboutMeResult.status === "rejected") {
    throw aboutMeResult.reason;
  }

  return {
    aboutMe: aboutMeResult.value,
    awards: awardsResult.status === "fulfilled" ? awardsResult.value : [],
    certificates: certificatesResult.status === "fulfilled" ? certificatesResult.value : [],
    skills: skillsResult.status === "fulfilled" ? skillsResult.value : [],
    careers: careersResult.status === "fulfilled" ? careersResult.value : [],
    experiences: experiencesResult.status === "fulfilled" ? experiencesResult.value : [],
    educations: educationsResult.status === "fulfilled" ? educationsResult.value : [],
    projects: projectsResult.status === "fulfilled" ? projectsResult.value : [],
    activities: activitiesResult.status === "fulfilled" ? activitiesResult.value : [],
  };
}
