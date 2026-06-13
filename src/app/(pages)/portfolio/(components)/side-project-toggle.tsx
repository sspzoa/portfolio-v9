"use client";

import { useState } from "react";
import Button from "@/shared/components/button";
import Card from "@/shared/components/card";
import type { Project } from "@/shared/types";

interface SideProjectToggleProps {
  mainProjects: Project[];
  sideProjects: Project[];
}

export function SideProjectToggle({ mainProjects, sideProjects }: SideProjectToggleProps) {
  const [showSideProjects, setShowSideProjects] = useState(false);

  return (
    <div className="flex flex-col gap-spacing-800">
      {mainProjects.map((project, i) => (
        <Card
          key={i}
          image={project.coverImage ?? undefined}
          icon={project.iconImage ?? undefined}
          mainText={`${project.name} (${project.startDate ?? ""}${project.endDate ? ` – ${project.endDate}` : ""})`}
          subText={`${project.teamSize ?? "?"}P · ${project.shortDescription ?? ""}`}
          tags={project.tags}
          description={project.description ?? undefined}
        />
      ))}

      {sideProjects.length > 0 && (
        <>
          {showSideProjects && (
            <div className="flex flex-col gap-spacing-800 border-line-divider border-t pt-spacing-800">
              {sideProjects.map((project, i) => (
                <Card
                  key={`side-${i}`}
                  image={project.coverImage ?? undefined}
                  icon={project.iconImage ?? undefined}
                  mainText={`${project.name} (${project.startDate ?? ""}${project.endDate ? ` – ${project.endDate}` : ""})`}
                  subText={`${project.teamSize ?? "?"}P · ${project.shortDescription ?? ""}`}
                  tags={project.tags}
                  description={project.description ?? undefined}
                />
              ))}
            </div>
          )}
          <Button
            text={showSideProjects ? "사이드 프로젝트 숨기기" : `사이드 프로젝트 ${sideProjects.length}개 더보기`}
            onClick={() => setShowSideProjects((prev) => !prev)}
            ariaExpanded={showSideProjects}
          />
        </>
      )}
    </div>
  );
}
