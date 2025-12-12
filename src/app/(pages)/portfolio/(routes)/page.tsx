"use client";

import { CareersSection } from "@/app/(pages)/portfolio/(components)/careers";
import { ContributionsSection } from "@/app/(pages)/portfolio/(components)/contributions";
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
  useAboutMe();
  useSkills();
  useCareers();
  useExperiences();
  useEducations();
  useAwards();
  useCertificates();
  useProjects();
  useActivities();

  return (
    <div className="flex flex-col items-center gap-spacing-400 px-spacing-400 py-spacing-700">
      <div className="flex w-full max-w-5xl flex-col gap-spacing-400">
        <AboutMeSection />
        <SkillsSection />
        <div className="flex w-full flex-col gap-spacing-400 md:flex-row">
          <div className="flex w-full flex-col gap-spacing-400">
            <CareersSection />
          </div>
          <div className="flex w-full flex-col gap-spacing-400 md:flex-row"></div>
        </div>
        <ContributionsSection />
      </div>
    </div>
  );
}
