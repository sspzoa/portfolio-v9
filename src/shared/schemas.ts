import { z } from "zod";

export const skillSchema = z.object({
  name: z.string(),
  category: z.string(),
  isMain: z.boolean(),
  icon: z.string().url().nullable(),
  url: z.string().url(),
});

export const projectSchema = z.object({
  name: z.string(),
  shortDescription: z.string().nullable(),
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  teamSize: z.number().nullable(),
  isSideProject: z.boolean(),
  tags: z.array(z.string()),
  coverImage: z.string().url().nullable(),
  iconImage: z.string().url().nullable(),
});

export const experienceSchema = z.object({
  role: z.string(),
  organization: z.string().nullable(),
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  logo: z.string().url().nullable(),
});

export const educationSchema = z.object({
  department: z.string(),
  organization: z.string().nullable(),
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  logo: z.string().url().nullable(),
});

export const certificationSchema = z.object({
  name: z.string(),
  kind: z.string().nullable(),
  institution: z.string().nullable(),
  date: z.string().nullable(),
});

export const careerSchema = z.object({
  role: z.string(),
  organization: z.string().nullable(),
  description: z.string().nullable(),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
  logo: z.string().url().nullable(),
});

export const awardSchema = z.object({
  name: z.string(),
  tier: z.string().nullable(),
  date: z.string().nullable(),
});

export const activitySchema = z.object({
  name: z.string(),
  role: z.string(),
  hosts: z.array(z.string()),
  startDate: z.string().nullable(),
  endDate: z.string().nullable(),
});

export const aboutMeSchema = z.object({
  content: z.string(),
});

export type Skill = z.infer<typeof skillSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Career = z.infer<typeof careerSchema>;
export type Award = z.infer<typeof awardSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type AboutMe = z.infer<typeof aboutMeSchema>;
