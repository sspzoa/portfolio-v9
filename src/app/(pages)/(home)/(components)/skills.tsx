import Section from "@/shared/components/section";
import Tag from "@/shared/components/tag";
import { fetchSkills } from "@/shared/lib/portfolio-data";

interface SectionComponentProps {
  index?: number;
  id?: string;
}

export async function SkillsSection({ index, id }: SectionComponentProps) {
  try {
    const skills = await fetchSkills();
    if (skills.length === 0) return null;

    const groupedSkills = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    return (
      <Section id={id} title="Skills" index={index} count={skills.length}>
        <div className="flex flex-col">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div
              key={category}
              className="grid grid-cols-1 items-baseline gap-x-spacing-700 gap-y-spacing-300 border-line-divider border-t py-spacing-500 first:border-t-0 first:pt-0 md:grid-cols-[160px_1fr]">
              <p className="font-mono text-content-standard-tertiary text-footnote uppercase tracking-wider">
                {category}
              </p>
              <div className="flex flex-row flex-wrap gap-x-spacing-500 gap-y-spacing-300">
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
      <Section id={id} title="Skills" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
