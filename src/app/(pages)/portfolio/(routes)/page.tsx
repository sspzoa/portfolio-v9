"use client";

import { motion } from "framer-motion";
import { ActivitiesSection } from "@/app/(pages)/portfolio/(components)/activities";
import { AwardsSection } from "@/app/(pages)/portfolio/(components)/awards";
import { CareersSection } from "@/app/(pages)/portfolio/(components)/careers";
import { CertificatesSection } from "@/app/(pages)/portfolio/(components)/certificates";
import { ContributionsSection } from "@/app/(pages)/portfolio/(components)/contributions";
import { EducationsSection } from "@/app/(pages)/portfolio/(components)/educations";
import { ExperiencesSection } from "@/app/(pages)/portfolio/(components)/experiences";
import { ProfileSection } from "@/app/(pages)/portfolio/(components)/profile";
import { ProjectsSection } from "@/app/(pages)/portfolio/(components)/projects";
import { useSequentialPortfolio } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Footer from "@/shared/components/footer";
import { AboutMeSection } from "../(components)/aboutme";
import { SkillsSection } from "../(components)/skills";

export default function PortfolioPage() {
  const { aboutMe, skills, careers, educations, experiences, awards, certificates, projects, activities } =
    useSequentialPortfolio();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-spacing-800 px-spacing-400 py-spacing-800">
      <ProfileSection />
      <div className="flex w-full max-w-5xl flex-col gap-spacing-400">
        <AboutMeSection isLoading={aboutMe.isLoading} />
        <SkillsSection isLoading={skills.isLoading || !skills.isSuccess} />
        <div className="flex w-full flex-col gap-spacing-400 md:flex-row">
          <div className="flex w-full flex-col gap-spacing-400">
            <CareersSection isLoading={careers.isLoading || !careers.isSuccess} />
            <EducationsSection isLoading={educations.isLoading || !educations.isSuccess} />
            <ExperiencesSection isLoading={experiences.isLoading || !experiences.isSuccess} />
          </div>
          <div className="flex w-full flex-col gap-spacing-400">
            <AwardsSection isLoading={awards.isLoading || !awards.isSuccess} />
            <CertificatesSection isLoading={certificates.isLoading || !certificates.isSuccess} />
          </div>
        </div>
        <ContributionsSection />
        <ProjectsSection isLoading={projects.isLoading || !projects.isSuccess} />
        <ActivitiesSection isLoading={activities.isLoading || !activities.isSuccess} />
      </div>
      <Footer />
    </motion.div>
  );
}
