import { getErrorMessage } from "@/shared/lib/errors";
import { fetchCareers } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { Section } from "@/shared/ui/section";
import { TimelineEntry } from "@/shared/ui/timeline-entry";
import formatPeriod from "@/shared/utils/formatPeriod";

export async function CareersSection({ index, id }: SectionComponentProps) {
  try {
    const careers = await fetchCareers();
    if (careers.length === 0) return null;

    return (
      <Section id={id} title="Careers" index={index} count={careers.length}>
        <div className="flex flex-col gap-spacing-600">
          {careers.map((career) => (
            <TimelineEntry
              key={career.id}
              period={formatPeriod(career.startDate, career.endDate, { present: true })}
              title={career.organization ?? career.role}
              subtitle={career.organization ? career.role : null}
              logo={career.logo}
              description={career.description}
            />
          ))}
        </div>
      </Section>
    );
  } catch (error) {
    console.error("[CareersSection]", error);

    return (
      <Section id={id} title="Careers" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
