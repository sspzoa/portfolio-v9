import { SideProjectToggle } from "@/features/side-project-toggle";
import { getErrorMessage } from "@/shared/lib/errors";
import { fetchProjects } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { Section } from "@/shared/ui/section";

export async function ProjectsSection({ index, id }: SectionComponentProps) {
  try {
    const projects = await fetchProjects();
    if (projects.length === 0) return null;

    const mainProjects = projects.filter((project) => !project.isSideProject);
    const sideProjects = projects.filter((project) => project.isSideProject);

    return (
      <Section id={id} title="Projects" index={index} count={mainProjects.length + sideProjects.length}>
        <SideProjectToggle mainProjects={mainProjects} sideProjects={sideProjects} />
      </Section>
    );
  } catch (error) {
    console.error("[ProjectsSection]", error);

    return (
      <Section id={id} title="Projects" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
