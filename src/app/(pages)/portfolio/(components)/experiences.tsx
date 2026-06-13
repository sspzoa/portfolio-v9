import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { fetchExperiences } from "@/shared/lib/portfolio-data";

interface ExperiencesSectionProps {
  index?: number;
}

export async function ExperiencesSection({ index }: ExperiencesSectionProps) {
  try {
    const experiences = await fetchExperiences();

    return (
      <Section title="Experiences" index={index} count={experiences.length}>
        <div className="flex flex-col gap-spacing-700">
          {experiences.map((experience, i) => (
            <Card
              key={i}
              icon={experience.logo ?? undefined}
              mainText={`${experience.organization ?? ""} · ${experience.role}`}
              subText={`${experience.startDate ?? ""}${experience.endDate ? ` – ${experience.endDate}` : " – Present"}`}
              description={experience.description ?? undefined}
            />
          ))}
        </div>
      </Section>
    );
  } catch {
    return (
      <Section title="Experiences" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
