"use client";

import { AboutMeSection } from "../(components)/aboutme";
import { SkillsSection } from "../(components)/skills";
import {
  useAboutMe,
  useActivities,
  useAwards,
  useCareers,
  useCertificates,
  useEducations,
  useExperiences,
  useProjects,
  useSkills,
} from "../(hooks)/usePortfolio";

export default function PortfolioPage() {
  useSkills();
  useProjects();
  useExperiences();
  useCareers();
  useCertificates();
  useEducations();
  useAwards();
  useActivities();
  useAboutMe();

  return (
    <div className="flex flex-col items-center gap-spacing-400 px-spacing-400 py-spacing-700">
      <div className="flex w-full max-w-5xl flex-col gap-spacing-400">
        <AboutMeSection />
        <SkillsSection />
      </div>
    </div>
  );
}
