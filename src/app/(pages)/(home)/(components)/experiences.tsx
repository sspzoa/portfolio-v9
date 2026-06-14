import Section from "@/shared/components/section";
import TimelineEntry from "@/shared/components/timeline-entry";
import { fetchExperiences } from "@/shared/lib/portfolio-data";
import formatPeriod from "@/shared/utils/formatPeriod";

interface SectionComponentProps {
  index?: number;
  id?: string;
}

export async function ExperiencesSection({ index, id }: SectionComponentProps) {
  try {
    const experiences = await fetchExperiences();
    if (experiences.length === 0) return null;

    return (
      <Section id={id} title="Experiences" index={index} count={experiences.length}>
        <div className="flex flex-col gap-spacing-600">
          {experiences.map((experience, i) => (
            <TimelineEntry
              key={i}
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
  } catch {
    return (
      <Section id={id} title="Experiences" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
