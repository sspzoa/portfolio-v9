import { atom } from "jotai";
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

export const SkillAtom = atom<Skill[]>([]);
export const ProjectAtom = atom<Project[]>([]);
export const ExperienceAtom = atom<Experience[]>([]);
export const EducationAtom = atom<Education[]>([]);
export const CertificationAtom = atom<Certification[]>([]);
export const CareerAtom = atom<Career[]>([]);
export const AwardAtom = atom<Award[]>([]);
export const ActivityAtom = atom<Activity[]>([]);
export const AboutMeAtom = atom<AboutMe | null>(null);
