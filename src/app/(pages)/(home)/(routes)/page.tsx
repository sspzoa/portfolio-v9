import Link from "next/link";
import { AboutMeSection } from "@/app/(pages)/(home)/(components)/aboutme";
import { ActivitiesSection } from "@/app/(pages)/(home)/(components)/activities";
import { AwardsSection } from "@/app/(pages)/(home)/(components)/awards";
import { CareersSection } from "@/app/(pages)/(home)/(components)/careers";
import { CertificatesSection } from "@/app/(pages)/(home)/(components)/certificates";
import { EducationsSection } from "@/app/(pages)/(home)/(components)/educations";
import { ExperiencesSection } from "@/app/(pages)/(home)/(components)/experiences";
import { Hero } from "@/app/(pages)/(home)/(components)/hero";
import { ProjectsSection } from "@/app/(pages)/(home)/(components)/projects";
import { SideNav } from "@/app/(pages)/(home)/(components)/side-nav";
import { SkillsSection } from "@/app/(pages)/(home)/(components)/skills";
import { Socials } from "@/app/(pages)/(home)/(components)/socials";
import Footer from "@/shared/components/footer";

export const dynamic = "force-dynamic";

const SECTIONS = [
  { id: "about", label: "About", Component: AboutMeSection },
  { id: "careers", label: "Careers", Component: CareersSection },
  { id: "experiences", label: "Experiences", Component: ExperiencesSection },
  { id: "educations", label: "Educations", Component: EducationsSection },
  { id: "skills", label: "Skills", Component: SkillsSection },
  { id: "awards", label: "Awards", Component: AwardsSection },
  { id: "certificates", label: "Certificates", Component: CertificatesSection },
  { id: "projects", label: "Projects", Component: ProjectsSection },
  { id: "activities", label: "Activities", Component: ActivitiesSection },
] as const;

const navItems = SECTIONS.map(({ id, label }) => ({ id, label }));

export default function Home() {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-spacing-500 md:px-spacing-700 lg:px-spacing-800">
      <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-x-spacing-850">
        <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:py-spacing-800">
          <div className="flex flex-col gap-spacing-150">
            <Link href="#top" className="font-semibold text-content-standard-primary text-label tracking-tight">
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
              className="font-mono text-content-standard-tertiary text-footnote transition-colors hover:text-content-standard-primary">
              me@sspzoa.io
            </Link>
            <p className="font-mono text-caption text-content-standard-quaternary">© {new Date().getFullYear()}</p>
          </div>
        </aside>

        <main id="main-content" tabIndex={-1} className="flex min-w-0 flex-col py-spacing-700 md:py-spacing-800">
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
