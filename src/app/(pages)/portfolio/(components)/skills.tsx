"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { StaggerContainer, StaggerItem } from "@/shared/components/motion";
import Section from "@/shared/components/section";
import { TagsSkeleton } from "@/shared/components/skeleton";
import Tag from "@/shared/components/tag";
import { SkillAtom } from "../(atoms)/usePortfolioStore";

export const SkillsSection = ({ isLoading }: { isLoading: boolean }) => {
  const skills = useAtomValue(SkillAtom);

  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, typeof skills>>((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }, [skills]);

  if (isLoading) {
    return (
      <Section title="Skills">
        <div className="flex flex-row flex-wrap gap-spacing-800">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-spacing-300">
              <div className="h-[22px] w-16 animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
              <TagsSkeleton />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Skills">
      <StaggerContainer className="flex flex-row flex-wrap gap-spacing-800" staggerDelay={0.08}>
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <StaggerItem key={category} className="flex flex-col gap-spacing-300">
            <p className="text-content-standard-tertiary text-label">{category}</p>
            <div className="flex flex-row flex-wrap gap-spacing-100">
              {categorySkills.map((skill, index) => (
                <Tag key={index} icon={skill.icon} name={skill.name} isMain={skill.isMain} />
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
};
