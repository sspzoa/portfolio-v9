"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { useProjects } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Button from "@/shared/components/button";
import Card from "@/shared/components/card";
import { StaggerContainer, StaggerItem } from "@/shared/components/motion";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { ProjectAtom } from "../(atoms)/usePortfolioStore";

const ease = [0.25, 0.1, 0.25, 1] as const;

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
        <StaggerContainer className="flex flex-col gap-spacing-800" staggerDelay={0.1}>
          {mainProjects.map((project, index) => (
            <StaggerItem key={index}>
              <Card
                image={project.coverImage}
                icon={project.iconImage}
                mainText={`${project.name} (${project.startDate}${project.endDate ? ` - ${project.endDate}` : ""})`}
                subText={`${project.teamSize}P project / ${project.shortDescription}`}
                tags={project.tags}
                description={project.description}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {sideProjects.length > 0 && (
          <>
            <AnimatePresence>
              {showSideProjects && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex flex-col gap-spacing-800 overflow-hidden">
                  {sideProjects.map((project, index) => (
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
                </motion.div>
              )}
            </AnimatePresence>
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
