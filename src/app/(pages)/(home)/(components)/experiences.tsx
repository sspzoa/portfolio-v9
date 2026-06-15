import Section from "@/shared/components/section";
import TimelineEntry from "@/shared/components/timeline-entry";
import { fetchExperiences, isConfigError } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import formatPeriod from "@/shared/utils/formatPeriod";

function getErrorMessage(error: unknown): string {
  return isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다.";
}

export async function ExperiencesSection({ index, id }: SectionComponentProps) {
  try {
    const experiences = await fetchExperiences();
    if (experiences.length === 0) return null;

    return (
      <Section id={id} title="Experiences" index={index} count={experiences.length}>
        <div className="flex flex-col gap-spacing-600">
          {experiences.map((experience) => (
            <TimelineEntry
              key={experience.id}
              period={formatPeriod(experience.startDate, experience.endDate, { present: true })}
              title={experience.organization ?? experience.role}
              subtitle={experience.organization ? experience.role : null}
              logo={experience.logo}
              description={experience.description}
            />
          ))}
        </div>
      </Section>
    );
  } catch (error) {
    console.error("[ExperiencesSection]", error);

    return (
      <Section id={id} title="Experiences" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
