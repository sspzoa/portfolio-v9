import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { fetchEducations } from "@/shared/lib/portfolio-data";

interface EducationsSectionProps {
  index?: number;
}

export async function EducationsSection({ index }: EducationsSectionProps) {
  try {
    const educations = await fetchEducations();

    return (
      <Section title="Educations" index={index} count={educations.length}>
        <div className="flex flex-col gap-spacing-700">
          {educations.map((education, i) => (
            <Card
              key={i}
              icon={education.logo ?? undefined}
              mainText={`${education.organization ?? ""} · ${education.department}`}
              subText={`${education.startDate ?? ""}${education.endDate ? ` – ${education.endDate}` : " – Present"}`}
              description={education.description ?? undefined}
            />
          ))}
        </div>
      </Section>
    );
  } catch {
    return (
      <Section title="Educations" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
