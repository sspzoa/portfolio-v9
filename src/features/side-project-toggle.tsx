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

  const visibleProjects = showSideProjects ? [...mainProjects, ...sideProjects] : mainProjects;

  return (
    <div className="flex flex-col gap-spacing-700">
      <div id={sideListId} className="grid grid-cols-1 gap-x-spacing-600 gap-y-spacing-800 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={`${project.isSideProject ? "side" : "main"}-${project.id}`} project={project} />
        ))}
      </div>

      {sideProjects.length > 0 && (
        <Button
          text={showSideProjects ? "사이드 프로젝트 숨기기 −" : `사이드 프로젝트 ${sideProjects.length}개 더보기 +`}
          onClick={() => setShowSideProjects((prev) => !prev)}
          aria-expanded={showSideProjects}
          aria-controls={sideListId}
        />
      )}
    </div>
  );
}
