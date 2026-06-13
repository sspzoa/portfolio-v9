import Section from "@/shared/components/section";
import { fetchProjects } from "@/shared/lib/portfolio-data";
import { SideProjectToggle } from "./side-project-toggle";

interface ProjectsSectionProps {
  index?: number;
}

export async function ProjectsSection({ index }: ProjectsSectionProps) {
  try {
    const projects = await fetchProjects();

    const mainProjects = projects.filter((project) => !project.isSideProject);
    const sideProjects = projects.filter((project) => project.isSideProject);

    return (
      <Section title="Projects" index={index} count={mainProjects.length + sideProjects.length}>
        <SideProjectToggle mainProjects={mainProjects} sideProjects={sideProjects} />
      </Section>
    );
  } catch {
    return (
      <Section title="Projects" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
