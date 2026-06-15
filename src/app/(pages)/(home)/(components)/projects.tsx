import Section from "@/shared/components/section";
import { fetchProjects, isConfigError } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { SideProjectToggle } from "./side-project-toggle";

function getErrorMessage(error: unknown): string {
  return isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다.";
}

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
