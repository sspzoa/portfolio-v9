"use client";

import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { useProjects } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Button from "@/shared/components/button";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { ProjectAtom } from "../(atoms)/usePortfolioStore";

export const ProjectsSection = ({ index }: { index?: number }) => {
  const { isLoading } = useProjects();
  const projects = useAtomValue(ProjectAtom);
  const [showSideProjects, setShowSideProjects] = useState(false);

  const { mainProjects, sideProjects } = useMemo(() => {
    return projects.reduce<{
      mainProjects: typeof projects;
      sideProjects: typeof projects;
    }>(
      (acc, project) => {
        if (project.isSideProject) {
          acc.sideProjects.push(project);
        } else {
          acc.mainProjects.push(project);
        }
        return acc;
      },
      { mainProjects: [], sideProjects: [] },
    );
  }, [projects]);

  const toggleSideProjects = () => {
    setShowSideProjects((prev) => !prev);
  };

  if (isLoading) {
    return (
      <Section title="Projects" index={index}>
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} hasImage hasTags hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Projects" index={index} count={mainProjects.length + (showSideProjects ? sideProjects.length : 0)}>
      <div className="flex flex-col gap-spacing-800">
        {mainProjects.map((project, i) => (
          <Card
            key={i}
            image={project.coverImage}
            icon={project.iconImage}
            mainText={`${project.name} (${project.startDate}${project.endDate ? ` – ${project.endDate}` : ""})`}
            subText={`${project.teamSize}P · ${project.shortDescription}`}
            tags={project.tags}
            description={project.description}
            isPinned={project.isPinned}
          />
        ))}

        {sideProjects.length > 0 && (
          <>
            {showSideProjects && (
              <div className="flex flex-col gap-spacing-800 border-line-divider border-t pt-spacing-800">
                {sideProjects.map((project, i) => (
                  <Card
                    key={`side-${i}`}
                    image={project.coverImage}
                    icon={project.iconImage}
                    mainText={`${project.name} (${project.startDate}${project.endDate ? ` – ${project.endDate}` : ""})`}
                    subText={`${project.teamSize}P · ${project.shortDescription}`}
                    tags={project.tags}
                    description={project.description}
                    isPinned={project.isPinned}
                  />
                ))}
              </div>
            )}
            <Button
              text={showSideProjects ? "사이드 프로젝트 숨기기" : `사이드 프로젝트 ${sideProjects.length}개 더보기`}
              onClick={toggleSideProjects}
            />
          </>
        )}
      </div>
    </Section>
  );
};
