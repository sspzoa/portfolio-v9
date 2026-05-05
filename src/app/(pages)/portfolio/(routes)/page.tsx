"use client";

import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { ActivitiesSection } from "@/app/(pages)/portfolio/(components)/activities";
import { AwardsSection } from "@/app/(pages)/portfolio/(components)/awards";
import { CareersSection } from "@/app/(pages)/portfolio/(components)/careers";
import { CertificatesSection } from "@/app/(pages)/portfolio/(components)/certificates";
import { ContributionsSection } from "@/app/(pages)/portfolio/(components)/contributions";
import { EducationsSection } from "@/app/(pages)/portfolio/(components)/educations";
import { ExperiencesSection } from "@/app/(pages)/portfolio/(components)/experiences";
import { ProfileSection } from "@/app/(pages)/portfolio/(components)/profile";
import { ProjectsSection } from "@/app/(pages)/portfolio/(components)/projects";
import Footer from "@/shared/components/footer";
import { AboutMeSection } from "../(components)/aboutme";
import { SkillsSection } from "../(components)/skills";

export default function PortfolioPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center bg-background-standard-primary px-spacing-500 py-spacing-700 md:py-spacing-800">
      <div className="flex w-full max-w-3xl flex-col">
        <nav className="flex w-full items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-spacing-150 font-medium text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary">
            <LucideArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
            Home
          </Link>
          <span className="font-medium text-caption text-content-standard-quaternary uppercase tracking-widest">
            Portfolio · 2026
          </span>
        </nav>

        <ProfileSection />

        <div className="flex flex-col gap-spacing-700">
          <AboutMeSection index={1} />
          <AwardsSection index={2} />
          <CertificatesSection index={3} />
          <SkillsSection index={4} />
          <CareersSection index={5} />
          <ExperiencesSection index={6} />
          <EducationsSection index={7} />
          <ProjectsSection index={8} />
          <ContributionsSection index={9} />
          <ActivitiesSection index={10} />
        </div>

        <div className="mt-spacing-1000">
          <Footer />
        </div>
      </div>
    </main>
  );
}
