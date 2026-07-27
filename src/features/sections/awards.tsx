import { getErrorMessage } from "@/shared/lib/errors";
import { fetchAwards } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { RecordRow } from "@/shared/ui/record-row";
import { Section } from "@/shared/ui/section";

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
