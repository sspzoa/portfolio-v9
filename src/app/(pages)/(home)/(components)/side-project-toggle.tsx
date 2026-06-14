"use client";

import { useState } from "react";
import Button from "@/shared/components/button";
import ProjectItem from "@/shared/components/project-item";
import type { Project } from "@/shared/types";

interface SideProjectToggleProps {
  mainProjects: Project[];
  sideProjects: Project[];
}

export function SideProjectToggle({ mainProjects, sideProjects }: SideProjectToggleProps) {
  const [showSideProjects, setShowSideProjects] = useState(false);

  // Render main and (optionally) side projects in one flow so the hairline rhythm
  // is unbroken — only the very first project drops its top border (first:border-t-0).
  const visibleProjects = showSideProjects ? [...mainProjects, ...sideProjects] : mainProjects;

  return (
    <div className="flex flex-col gap-spacing-700">
      {visibleProjects.map((project, i) => (
        <ProjectItem key={`${project.isSideProject ? "side" : "main"}-${i}`} project={project} />
      ))}

      {sideProjects.length > 0 && (
        <Button
          text={showSideProjects ? "사이드 프로젝트 숨기기 −" : `사이드 프로젝트 ${sideProjects.length}개 더보기 +`}
          onClick={() => setShowSideProjects((prev) => !prev)}
          ariaExpanded={showSideProjects}
        />
      )}
    </div>
  );
}
