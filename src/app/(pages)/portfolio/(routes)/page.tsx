"use client";

import { ActivitiesSection } from "@/app/(pages)/portfolio/(components)/activities";
import { AwardsSection } from "@/app/(pages)/portfolio/(components)/awards";
import { CareersSection } from "@/app/(pages)/portfolio/(components)/careers";
import { CertificatesSection } from "@/app/(pages)/portfolio/(components)/certificates";
import { ContributionsSection } from "@/app/(pages)/portfolio/(components)/contributions";
import { EducationsSection } from "@/app/(pages)/portfolio/(components)/educations";
import { ExperiencesSection } from "@/app/(pages)/portfolio/(components)/experiences";
import { ProjectsSection } from "@/app/(pages)/portfolio/(components)/projects";
import Footer from "@/shared/components/footer";
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
    <div className="flex flex-col items-center gap-spacing-800 px-spacing-400 py-spacing-800">
      <div className="flex w-full max-w-5xl flex-col gap-spacing-400">
        <AboutMeSection />
        <SkillsSection />
        <div className="flex w-full flex-col gap-spacing-400 md:flex-row">
          <div className="flex w-full flex-col gap-spacing-400">
            <CareersSection />
            <EducationsSection />
            <ExperiencesSection />
          </div>
          <div className="flex w-full flex-col gap-spacing-400">
            <AwardsSection />
            <CertificatesSection />
          </div>
        </div>
        <ContributionsSection />
        <ProjectsSection />
        <ActivitiesSection />
      </div>
      <Footer />
    </div>
  );
}
