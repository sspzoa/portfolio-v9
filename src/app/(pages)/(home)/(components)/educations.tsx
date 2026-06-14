import Section from "@/shared/components/section";
import TimelineEntry from "@/shared/components/timeline-entry";
import { fetchEducations } from "@/shared/lib/portfolio-data";
import formatPeriod from "@/shared/utils/formatPeriod";

interface SectionComponentProps {
  index?: number;
  id?: string;
}

export async function EducationsSection({ index, id }: SectionComponentProps) {
  try {
    const educations = await fetchEducations();
    if (educations.length === 0) return null;

    return (
      <Section id={id} title="Educations" index={index} count={educations.length}>
        <div className="flex flex-col gap-spacing-600">
          {educations.map((education, i) => (
            <TimelineEntry
              key={i}
              period={formatPeriod(education.startDate, education.endDate, { present: true })}
              title={education.organization ?? education.department}
              subtitle={education.organization ? education.department : null}
              logo={education.logo}
              description={education.description}
            />
          ))}
        </div>
      </Section>
    );
  } catch {
    return (
      <Section id={id} title="Educations" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
