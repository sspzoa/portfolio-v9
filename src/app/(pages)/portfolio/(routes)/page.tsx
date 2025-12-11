"use client";

import { useAtomValue } from "jotai";
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
import { useAboutMe } from "../(hooks)/useAboutMe";
import { useActivities } from "../(hooks)/useActivities";
import { useAwards } from "../(hooks)/useAwards";
import { useCareers } from "../(hooks)/useCareers";
import { useCertificates } from "../(hooks)/useCertificates";
import { useEducations } from "../(hooks)/useEducations";
import { useExperiences } from "../(hooks)/useExperiences";
import { useProjects } from "../(hooks)/useProjects";
import { useSkills } from "../(hooks)/useSkills";

export default function PortfolioPage() {
  const { isLoading: skillsLoading, isError: skillsError } = useSkills();
  const { isLoading: projectsLoading, isError: projectsError } = useProjects();
  const { isLoading: experiencesLoading, isError: experiencesError } = useExperiences();
  const { isLoading: careersLoading, isError: careersError } = useCareers();
  const { isLoading: certificatesLoading, isError: certificatesError } = useCertificates();
  const { isLoading: educationsLoading, isError: educationsError } = useEducations();
  const { isLoading: awardsLoading, isError: awardsError } = useAwards();
  const { isLoading: activitiesLoading, isError: activitiesError } = useActivities();
  const { isLoading: aboutmeLoading, isError: aboutmeError } = useAboutMe();

  const _skills = useAtomValue(SkillAtom);
  const _projects = useAtomValue(ProjectAtom);
  const _experiences = useAtomValue(ExperienceAtom);
  const _careers = useAtomValue(CareerAtom);
  const _certificates = useAtomValue(CertificationAtom);
  const _educations = useAtomValue(EducationAtom);
  const _awards = useAtomValue(AwardAtom);
  const _activities = useAtomValue(ActivityAtom);
  const _aboutme = useAtomValue(AboutMeAtom);

  return (
    <div className="flex flex-col items-center justify-center px-spacing-400 py-spacing-700">
      <h1 className="font-semibold text-display">Portfolio</h1>
    </div>
  );
}
