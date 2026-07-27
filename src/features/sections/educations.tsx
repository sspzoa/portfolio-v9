import { getErrorMessage } from "@/shared/lib/errors";
import { fetchEducations } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { Section } from "@/shared/ui/section";
import { TimelineEntry } from "@/shared/ui/timeline-entry";
import formatPeriod from "@/shared/utils/formatPeriod";

export async function EducationsSection({ index, id }: SectionComponentProps) {
  try {
    const educations = await fetchEducations();
    if (educations.length === 0) return null;

    return (
      <Section id={id} title="Education" index={index} count={educations.length}>
        <div className="flex flex-col gap-spacing-600">
          {educations.map((education) => (
            <TimelineEntry
              key={education.id}
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
  } catch (error) {
    console.error("[EducationsSection]", error);

    return (
      <Section id={id} title="Education" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
