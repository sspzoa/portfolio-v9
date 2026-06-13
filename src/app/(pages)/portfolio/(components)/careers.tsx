import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { fetchCareers } from "@/shared/lib/portfolio-data";

interface CareersSectionProps {
  index?: number;
}

export async function CareersSection({ index }: CareersSectionProps) {
  try {
    const careers = await fetchCareers();

    return (
      <Section title="Careers" index={index} count={careers.length}>
        <div className="flex flex-col gap-spacing-700">
          {careers.map((career, i) => (
            <Card
              key={i}
              icon={career.logo ?? undefined}
              mainText={`${career.organization ?? ""} · ${career.role}`}
              subText={`${career.startDate ?? ""}${career.endDate ? ` – ${career.endDate}` : " – Present"}`}
              description={career.description ?? undefined}
            />
          ))}
        </div>
      </Section>
    );
  } catch {
    return (
      <Section title="Careers" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
