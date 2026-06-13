import ListItem from "@/shared/components/list-item";
import Section from "@/shared/components/section";
import { fetchAwards } from "@/shared/lib/portfolio-data";

interface AwardsSectionProps {
  index?: number;
}

export async function AwardsSection({ index }: AwardsSectionProps) {
  try {
    const awards = await fetchAwards();

    return (
      <Section title="Awards" index={index} count={awards.length}>
        <ul className="flex flex-col">
          {awards.map((award, i) => (
            <ListItem key={i} title={award.name} meta={award.date ?? ""} badge={award.tier ?? undefined} />
          ))}
        </ul>
      </Section>
    );
  } catch {
    return (
      <Section title="Awards" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
