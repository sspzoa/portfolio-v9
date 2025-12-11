import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
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
import {
  AboutMeAtom,
  ActivityAtom,
  AwardAtom,
  CareerAtom,
  CertificationAtom,
  EducationAtom,
  ExperienceAtom,
  ProjectAtom,
  SkillAtom,
} from "../(atoms)/usePortfolioStore";

export const useSkills = () => {
  const setSkills = useSetAtom(SkillAtom);

  return useQuery<Skill[]>({
    queryKey: ["portfolio", "skills"],
    queryFn: async () => {
      const response = await fetch("/api/skills");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setSkills(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useProjects = () => {
  const setProjects = useSetAtom(ProjectAtom);

  return useQuery<Project[]>({
    queryKey: ["portfolio", "projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setProjects(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useExperiences = () => {
  const setExperiences = useSetAtom(ExperienceAtom);

  return useQuery<Experience[]>({
    queryKey: ["portfolio", "experiences"],
    queryFn: async () => {
      const response = await fetch("/api/experiences");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setExperiences(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCareers = () => {
  const setCareers = useSetAtom(CareerAtom);

  return useQuery<Career[]>({
    queryKey: ["portfolio", "careers"],
    queryFn: async () => {
      const response = await fetch("/api/careers");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setCareers(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCertificates = () => {
  const setCertificates = useSetAtom(CertificationAtom);

  return useQuery<Certification[]>({
    queryKey: ["portfolio", "certificates"],
    queryFn: async () => {
      const response = await fetch("/api/certificates");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setCertificates(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useEducations = () => {
  const setEducations = useSetAtom(EducationAtom);

  return useQuery<Education[]>({
    queryKey: ["portfolio", "educations"],
    queryFn: async () => {
      const response = await fetch("/api/educations");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setEducations(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAwards = () => {
  const setAwards = useSetAtom(AwardAtom);

  return useQuery<Award[]>({
    queryKey: ["portfolio", "awards"],
    queryFn: async () => {
      const response = await fetch("/api/awards");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setAwards(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useActivities = () => {
  const setActivities = useSetAtom(ActivityAtom);

  return useQuery<Activity[]>({
    queryKey: ["portfolio", "activities"],
    queryFn: async () => {
      const response = await fetch("/api/activities");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setActivities(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useAboutMe = () => {
  const setAboutMe = useSetAtom(AboutMeAtom);

  return useQuery<AboutMe>({
    queryKey: ["portfolio", "aboutme"],
    queryFn: async () => {
      const response = await fetch("/api/aboutme");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setAboutMe(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
