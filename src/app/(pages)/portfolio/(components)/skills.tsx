"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { useSkills } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Section from "@/shared/components/section";
import { TagsSkeleton } from "@/shared/components/skeleton";
import Tag from "@/shared/components/tag";
import { SkillAtom } from "../(atoms)/usePortfolioStore";

export const SkillsSection = ({ index }: { index?: number }) => {
  const { isLoading } = useSkills();
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
      <Section title="Skills" index={index}>
        <div className="flex flex-col">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-spacing-300 border-line-divider border-b py-spacing-400 md:grid-cols-[140px_1fr]">
              <div className="h-[20px] w-20 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
              <TagsSkeleton />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Skills" index={index} count={skills.length}>
      <div className="flex flex-col">
        {Object.entries(groupedSkills).map(([category, categorySkills], idx, arr) => (
          <div
            key={category}
            className={`grid grid-cols-1 items-baseline gap-x-spacing-500 gap-y-spacing-300 py-spacing-400 md:grid-cols-[140px_1fr] ${
              idx < arr.length - 1 ? "border-line-divider border-b" : ""
            }`}>
            <p className="font-medium text-content-standard-tertiary text-footnote uppercase tracking-wider">
              {category}
            </p>
            <div className="flex flex-row flex-wrap gap-spacing-150">
              {categorySkills.map((skill, i) => (
                <Tag key={i} icon={skill.icon} name={skill.name} isMain={skill.isMain} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
