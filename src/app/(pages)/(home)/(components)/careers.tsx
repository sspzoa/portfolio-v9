import Section from "@/shared/components/section";
import TimelineEntry from "@/shared/components/timeline-entry";
import { fetchCareers, isConfigError } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import formatPeriod from "@/shared/utils/formatPeriod";

function getErrorMessage(error: unknown): string {
  return isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다.";
}

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
