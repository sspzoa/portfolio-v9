"use client";

import { useEducations } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";

export const EducationsSection = () => {
  const { data: educations = [], isLoading, isError } = useEducations();

  if (isLoading) {
    return (
      <Section title="Educations">
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 1 }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Educations">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Educations">
      <div className="flex flex-col gap-spacing-800">
        {educations.map((education) => (
          <Card
            key={`${education.organization}-${education.department}`}
            icon={education.logo}
            mainText={`${education.organization} - ${education.department}`}
            subText={`${education.startDate} ${education.endDate ? `- ${education.endDate}` : ""}`}
            description={education.description}
          />
        ))}
      </div>
    </Section>
  );
};
