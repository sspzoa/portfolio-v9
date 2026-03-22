"use client";

import { useCareers } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";

export const CareersSection = () => {
  const { data: careers = [], isLoading, isError } = useCareers();

  if (isLoading) {
    return (
      <Section title="Careers">
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
      <Section title="Careers">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Careers">
      <div className="flex flex-col gap-spacing-800">
        {careers.map((career) => (
          <Card
            key={`${career.organization}-${career.role}`}
            icon={career.logo}
            mainText={`${career.organization} - ${career.role}`}
            subText={`${career.startDate} ${career.endDate ? `- ${career.endDate}` : ""}`}
            description={career.description}
          />
        ))}
      </div>
    </Section>
  );
};
