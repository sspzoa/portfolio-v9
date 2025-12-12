"use client";

import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { useProjects } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Button from "@/shared/components/button";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { ProjectAtom } from "../(atoms)/usePortfolioStore";

export const ProjectsSection = () => {
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
      <Section title="Projects">
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 5 }).map((_, index) => (
            <CardSkeleton key={index} hasImage hasTags hasDescription />
          ))}
          {showSideProjects &&
            Array.from({ length: 5 }).map((_, index) => <CardSkeleton key={index} hasImage hasTags hasDescription />)}
          <Button
            text={showSideProjects ? "사이드 프로젝트 숨기기" : `사이드 프로젝트 ${sideProjects.length}개 더보기`}
            onClick={toggleSideProjects}
          />
        </div>
      </Section>
    );
  }

  return (
    <Section title="Projects">
      <div className="flex flex-col gap-spacing-800">
        {mainProjects.map((project, index) => (
          <Card
            key={index}
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
            {showSideProjects &&
              sideProjects.map((project, index) => (
                <Card
                  key={`side-${index}`}
                  image={project.coverImage}
                  icon={project.iconImage}
                  mainText={`${project.name} (${project.startDate}${project.endDate ? ` - ${project.endDate}` : ""})`}
                  subText={`${project.teamSize}P project / ${project.shortDescription}`}
                  tags={project.tags}
                  description={project.description}
                />
              ))}
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
