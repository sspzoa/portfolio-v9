import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/features/footer";
import { Hero } from "@/features/hero";
import { MobileHeader, SideNav } from "@/features/nav";
import { AboutMeSection } from "@/features/sections/aboutme";
import { ActivitiesSection } from "@/features/sections/activities";
import { AwardsSection } from "@/features/sections/awards";
import { CareersSection } from "@/features/sections/careers";
import { CertificatesSection } from "@/features/sections/certificates";
import { EducationsSection } from "@/features/sections/educations";
import { ExperiencesSection } from "@/features/sections/experiences";
import { ProjectsSection } from "@/features/sections/projects";
import { SkillsSection } from "@/features/sections/skills";
import { Socials } from "@/features/socials";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio · Seungpyo Suh",
  description: "Seungpyo Suh - Product Engineer",
  alternates: {
    canonical: "https://sspzoa.io/portfolio",
  },
};

const SECTIONS = [
  { id: "about", label: "About", Component: AboutMeSection },
  { id: "awards", label: "Awards", Component: AwardsSection },
  { id: "certificates", label: "Certificates", Component: CertificatesSection },
  { id: "careers", label: "Careers", Component: CareersSection },
  { id: "experiences", label: "Experiences", Component: ExperiencesSection },
  { id: "skills", label: "Skills", Component: SkillsSection },
  { id: "education", label: "Education", Component: EducationsSection },
  { id: "projects", label: "Projects", Component: ProjectsSection },
  { id: "activities", label: "Activities", Component: ActivitiesSection },
] as const;

const navItems = SECTIONS.map(({ id, label }) => ({ id, label }));

export default function PortfolioPage() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-6xl px-spacing-500 md:px-spacing-700 lg:px-spacing-800">
      <MobileHeader items={navItems} brandHref="/" />

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-spacing-850">
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-spacing-800">
          <div className="flex flex-col gap-spacing-150">
            <Link href="/" className="font-semibold text-content-standard-primary text-label tracking-tight">
              Seungpyo Suh<span className="text-core-accent">.</span>
            </Link>
            <p className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-label-wide">
              Product Engineer
            </p>
          </div>

          <SideNav items={navItems} />

          <div className="flex flex-col gap-spacing-400">
            <Socials />
            <Link
              href="mailto:me@sspzoa.io"
              className="font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
              me@sspzoa.io
            </Link>
          </div>
        </aside>

        <main
          id="main-content"
          tabIndex={-1}
          className="flex min-w-0 max-w-content flex-col py-spacing-700 md:py-spacing-800">
          <Hero />

          <div className="mt-spacing-850 flex flex-col gap-spacing-850 md:mt-spacing-900 md:gap-spacing-900">
            {SECTIONS.map(({ id, Component }, i) => (
              <Component key={id} id={id} index={i + 1} />
            ))}
          </div>

          <div className="mt-spacing-900">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
