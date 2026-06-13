import { env } from "@/shared/lib/env";
import { notionRequest } from "@/shared/lib/notion";
import type {
  NotionAboutMePage,
  NotionActivityPage,
  NotionAwardPage,
  NotionCareerPage,
  NotionCertificatePage,
  NotionEducationPage,
  NotionExperiencePage,
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
    name: result.properties.name?.title?.[0]?.plain_text ?? "",
    category: result.properties.category?.select?.name ?? "",
    isMain: result.properties.isMain?.checkbox ?? false,
    icon: result.properties.icon?.files?.[0]?.file?.url ?? result.properties.icon?.files?.[0]?.external?.url ?? null,
    url: result.public_url ?? "",
  }));

  return skillSchema.array().parse(skills);
}

export async function fetchProjects(): Promise<Project[]> {
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
    name: result.properties.name?.title?.[0]?.plain_text ?? "",
    shortDescription: result.properties.shortDescription?.rich_text?.[0]?.plain_text ?? null,
    description: result.properties.description?.rich_text?.[0]?.plain_text ?? null,
    startDate: formatDate(result.properties.workPeriod?.date?.start),
    endDate: formatDate(result.properties.workPeriod?.date?.end),
    teamSize: result.properties.teamSize?.number ?? null,
    isSideProject: result.properties.isSideProject?.checkbox ?? false,
    tags: result.properties.tags?.multi_select?.map((tag) => tag.name) ?? [],
    coverImage: result.cover?.file?.url ?? result.cover?.external?.url ?? null,
    iconImage: result.icon?.file?.url ?? result.icon?.external?.url ?? null,
  }));

  return projectSchema.array().parse(projects);
}

export async function fetchExperiences(): Promise<Experience[]> {
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
    role: result.properties.role?.title?.[0]?.plain_text ?? "",
    organization: result.properties.organization?.rich_text?.[0]?.plain_text ?? null,
    description: result.properties.description?.rich_text?.[0]?.plain_text ?? null,
    startDate: formatDate(result.properties.date?.date?.start),
    endDate: formatDate(result.properties.date?.date?.end),
    logo: result.properties.logo?.files?.[0]?.file?.url ?? result.properties.logo?.files?.[0]?.external?.url ?? null,
  }));

  return experienceSchema.array().parse(experiences);
}

export async function fetchCareers(): Promise<Career[]> {
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
    role: result.properties.role?.title?.[0]?.plain_text ?? "",
    organization: result.properties.organization?.rich_text?.[0]?.plain_text ?? null,
    description: result.properties.description?.rich_text?.[0]?.plain_text ?? null,
    startDate: formatDate(result.properties.date?.date?.start),
    endDate: formatDate(result.properties.date?.date?.end),
    logo: result.properties.logo?.files?.[0]?.file?.url ?? result.properties.logo?.files?.[0]?.external?.url ?? null,
  }));

  return careerSchema.array().parse(careers);
}

export async function fetchEducations(): Promise<Education[]> {
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
    department: result.properties.department?.title?.[0]?.plain_text ?? "",
    organization: result.properties.organization?.rich_text?.[0]?.plain_text ?? null,
    description: result.properties.description?.rich_text?.[0]?.plain_text ?? null,
    startDate: formatDate(result.properties.date?.date?.start),
    endDate: formatDate(result.properties.date?.date?.end),
    logo: result.properties.logo?.files?.[0]?.file?.url ?? result.properties.logo?.files?.[0]?.external?.url ?? null,
  }));

  return educationSchema.array().parse(educations);
}

export async function fetchCertificates(): Promise<Certification[]> {
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
    name: result.properties.name?.title?.[0]?.plain_text ?? "",
    kind: result.properties.kind?.rich_text?.[0]?.plain_text ?? null,
    institution: result.properties.institution?.rich_text?.[0]?.plain_text ?? null,
    date: formatDate(result.properties.date?.date?.start),
  }));

  return certificationSchema.array().parse(certifications);
}

export async function fetchAwards(): Promise<Award[]> {
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
    name: result.properties.name?.title?.[0]?.plain_text ?? "",
    tier: result.properties.tier?.rich_text?.[0]?.plain_text ?? null,
    date: formatDate(result.properties.date?.date?.start),
  }));

  return awardSchema.array().parse(awards);
}

export async function fetchActivities(): Promise<Activity[]> {
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
    name: result.properties.name?.title?.[0]?.plain_text ?? "",
    role: result.properties.role?.select?.name ?? "",
    hosts: result.properties.host?.multi_select?.map((h) => h.name) ?? [],
    startDate: formatDate(result.properties.date?.date?.start),
    endDate: formatDate(result.properties.date?.date?.end),
  }));

  return activitySchema.array().parse(activities);
}

export async function fetchAboutMe(): Promise<AboutMe> {
  const response = await notionRequest<{ results: NotionAboutMePage[] }>(
    `/data_sources/${env.ABOUTME_DATA_SOURCE_ID}/query`,
    {
      method: "POST",
    },
  );

  const aboutme = {
    content: response.results?.[0]?.properties?.content?.rich_text?.[0]?.plain_text ?? "",
  };

  return aboutMeSchema.parse(aboutme);
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [aboutMe, awards, certificates, skills, careers, experiences, educations, projects, activities] =
    await Promise.all([
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

  return {
    aboutMe,
    awards,
    certificates,
    skills,
    careers,
    experiences,
    educations,
    projects,
    activities,
  };
}
