"use client";

import { useMemo, useState } from "react";
import { useProjects } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Button from "@/shared/components/button";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";

export const ProjectsSection = () => {
  const { data: projects = [], isLoading, isError } = useProjects();
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
      <Section title="Projects">
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} hasImage hasTags hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Projects">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Projects">
      <div className="flex flex-col gap-spacing-800">
        {mainProjects.map((project) => (
          <Card
            key={project.name}
            image={project.coverImage}
            icon={project.iconImage}
            mainText={`${project.name} (${project.startDate}${project.endDate ? ` - ${project.endDate}` : ""})`}
            subText={`${project.teamSize}P project / ${project.shortDescription}`}
            tags={project.tags}
            description={project.description}
          />
        ))}

        {sideProjects.length > 0 && (
          <>
            {showSideProjects && (
              <div className="flex flex-col gap-spacing-800">
                {sideProjects.map((project) => (
                  <Card
                    key={`side-${project.name}`}
                    image={project.coverImage}
                    icon={project.iconImage}
                    mainText={`${project.name} (${project.startDate}${project.endDate ? ` - ${project.endDate}` : ""})`}
                    subText={`${project.teamSize}P project / ${project.shortDescription}`}
                    tags={project.tags}
                    description={project.description}
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
