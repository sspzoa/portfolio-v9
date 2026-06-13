import Section from "@/shared/components/section";
import Tag from "@/shared/components/tag";
import { fetchSkills } from "@/shared/lib/portfolio-data";

interface SkillsSectionProps {
  index?: number;
}

export async function SkillsSection({ index }: SkillsSectionProps) {
  try {
    const skills = await fetchSkills();

    const groupedSkills = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

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
  } catch {
    return (
      <Section title="Skills" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
