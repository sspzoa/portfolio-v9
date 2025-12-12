"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { ProjectAtom } from "../(atoms)/usePortfolioStore";

export const ProjectsSection = () => {
  const projects = useAtomValue(ProjectAtom);

  return (
    <Section title="Projects">
      <div className="flex flex-col gap-spacing-800">
        {projects.map((project, index) => (
          <Card
            key={index}
            image={project.coverImage}
            icon={project.iconImage}
            mainText={`${project.name} / ${project.startDate} ${project.endDate ? `- ${project.endDate}` : ""}`}
            subText={`${project.teamSize}P project / ${project.shortDescription}`}
            tags={project.tags}
            description={project.description}
          />
        ))}
      </div>
    </Section>
  );
};
