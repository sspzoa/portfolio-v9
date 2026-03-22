import { useQuery } from "@tanstack/react-query";
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

const portfolioFetch = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`/api/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return response.json();
};

export const useSkills = () =>
  useQuery<Skill[]>({
    queryKey: ["portfolio", "skills"],
    queryFn: () => portfolioFetch<Skill[]>("skills"),
  });

export const useProjects = () =>
  useQuery<Project[]>({
    queryKey: ["portfolio", "projects"],
    queryFn: () => portfolioFetch<Project[]>("projects"),
  });

export const useExperiences = () =>
  useQuery<Experience[]>({
    queryKey: ["portfolio", "experiences"],
    queryFn: () => portfolioFetch<Experience[]>("experiences"),
  });

export const useCareers = () =>
  useQuery<Career[]>({
    queryKey: ["portfolio", "careers"],
    queryFn: () => portfolioFetch<Career[]>("careers"),
  });

export const useCertificates = () =>
  useQuery<Certification[]>({
    queryKey: ["portfolio", "certificates"],
    queryFn: () => portfolioFetch<Certification[]>("certificates"),
  });

export const useEducations = () =>
  useQuery<Education[]>({
    queryKey: ["portfolio", "educations"],
    queryFn: () => portfolioFetch<Education[]>("educations"),
  });

export const useAwards = () =>
  useQuery<Award[]>({
    queryKey: ["portfolio", "awards"],
    queryFn: () => portfolioFetch<Award[]>("awards"),
  });

export const useActivities = () =>
  useQuery<Activity[]>({
    queryKey: ["portfolio", "activities"],
    queryFn: () => portfolioFetch<Activity[]>("activities"),
  });

export const useAboutMe = () =>
  useQuery<AboutMe>({
    queryKey: ["portfolio", "aboutme"],
    queryFn: () => portfolioFetch<AboutMe>("aboutme"),
  });
