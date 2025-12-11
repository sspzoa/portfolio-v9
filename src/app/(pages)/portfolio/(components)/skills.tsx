"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";
import Section from "@/shared/components/section";
import Tag from "@/shared/components/tag";
import { SkillAtom } from "../(atoms)/usePortfolioStore";

export const SkillsSection = () => {
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

  return (
    <Section title="Skills">
      <div className="flex flex-row flex-wrap gap-spacing-800">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="flex flex-col gap-spacing-300">
            <p className="text-content-standard-tertiary text-label">{category}</p>
            <div className="flex flex-row flex-wrap gap-spacing-100">
              {categorySkills.map((skill, index) => (
                <Tag key={index} icon={skill.icon} name={skill.name} isMain={skill.isMain} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};
