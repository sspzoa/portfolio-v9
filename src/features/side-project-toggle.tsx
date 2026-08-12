"use client";

import { useId, useState } from "react";
import type { Project } from "@/shared/types";
import { Button } from "@/shared/ui/button";
import { ProjectCard } from "@/shared/ui/project-card";

interface SideProjectToggleProps {
  mainProjects: Project[];
  sideProjects: Project[];
}

export function SideProjectToggle({ mainProjects, sideProjects }: SideProjectToggleProps) {
  const [showSideProjects, setShowSideProjects] = useState(false);
  const sideListId = useId();

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-x-spacing-600 gap-y-spacing-800 md:grid-cols-2">
        {mainProjects.map((project) => (
          <ProjectCard key={`main-${project.id}`} project={project} />
        ))}
      </div>

      {sideProjects.length > 0 && (
        <>
          <div
            id={sideListId}
            className={`grid transition-[grid-template-rows] duration-slow ease-standard ${
              showSideProjects ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
            inert={showSideProjects ? undefined : true}>
            <div className="min-h-0 overflow-hidden">
              <div
                className={`grid grid-cols-1 gap-x-spacing-600 gap-y-spacing-800 pt-spacing-800 transition-opacity duration-slow ease-standard md:grid-cols-2 ${
                  showSideProjects ? "opacity-100" : "opacity-0"
                }`}>
                {sideProjects.map((project) => (
                  <ProjectCard key={`side-${project.id}`} project={project} />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-spacing-700">
            <Button
              text={showSideProjects ? "사이드 프로젝트 숨기기 −" : `사이드 프로젝트 ${sideProjects.length}개 더보기 +`}
              onClick={() => setShowSideProjects((prev) => !prev)}
              aria-expanded={showSideProjects}
              aria-controls={sideListId}
            />
          </div>
        </>
      )}
    </div>
  );
}
