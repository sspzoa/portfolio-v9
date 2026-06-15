import RecordRow from "@/shared/components/record-row";
import Section from "@/shared/components/section";
import { fetchAwards, isConfigError } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";

function getErrorMessage(error: unknown): string {
  return isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다.";
}

export async function AwardsSection({ index, id }: SectionComponentProps) {
  try {
    const awards = await fetchAwards();
    if (awards.length === 0) return null;

    return (
      <Section id={id} title="Awards" index={index} count={awards.length}>
        <ul className="flex flex-col">
          {awards.map((award) => (
            <RecordRow key={award.id} title={award.name} badge={award.tier} date={award.date} />
          ))}
        </ul>
      </Section>
    );
  } catch (error) {
    console.error("[AwardsSection]", error);

    return (
      <Section id={id} title="Awards" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
