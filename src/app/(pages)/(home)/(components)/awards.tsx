import RecordRow from "@/shared/components/record-row";
import Section from "@/shared/components/section";
import { fetchAwards } from "@/shared/lib/portfolio-data";

interface SectionComponentProps {
  index?: number;
  id?: string;
}

export async function AwardsSection({ index, id }: SectionComponentProps) {
  try {
    const awards = await fetchAwards();
    if (awards.length === 0) return null;

    return (
      <Section id={id} title="Awards" index={index} count={awards.length}>
        <ul className="flex flex-col">
          {awards.map((award, i) => (
            <RecordRow key={i} title={award.name} badge={award.tier ?? undefined} date={award.date ?? undefined} />
          ))}
        </ul>
      </Section>
    );
  } catch {
    return (
      <Section id={id} title="Awards" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
