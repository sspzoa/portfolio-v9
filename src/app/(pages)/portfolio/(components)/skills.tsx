"use client";

import { useMemo } from "react";
import { useSkills } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Section from "@/shared/components/section";
import { TagsSkeleton } from "@/shared/components/skeleton";
import Tag from "@/shared/components/tag";

export const SkillsSection = () => {
  const { data: skills = [], isLoading, isError } = useSkills();

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
            <div key={`skeleton-${index}`} className="flex flex-col gap-spacing-300">
              <div className="h-[22px] w-16 animate-pulse rounded-radius-full border border-line-outline bg-components-fill-standard-secondary" />
              <TagsSkeleton />
            </div>
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Skills">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Skills">
      <div className="flex flex-row flex-wrap gap-spacing-800">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="flex flex-col gap-spacing-300">
            <p className="text-content-standard-tertiary text-label">{category}</p>
            <div className="flex flex-row flex-wrap gap-spacing-100">
              {categorySkills.map((skill) => (
                <Tag key={skill.name} icon={skill.icon} name={skill.name} isMain={skill.isMain} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
