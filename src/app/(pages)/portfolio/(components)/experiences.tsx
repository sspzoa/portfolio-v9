"use client";

import { useExperiences } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";

export const ExperiencesSection = () => {
  const { data: experiences = [], isLoading, isError } = useExperiences();

  if (isLoading) {
    return (
      <Section title="Experiences">
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Experiences">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Experiences">
      <div className="flex flex-col gap-spacing-800">
        {experiences.map((experience) => (
          <Card
            key={`${experience.organization}-${experience.role}`}
            icon={experience.logo}
            mainText={`${experience.organization} - ${experience.role}`}
            subText={`${experience.startDate} ${experience.endDate ? `- ${experience.endDate}` : ""}`}
            description={experience.description}
          />
        ))}
      </div>
    </Section>
  );
};
