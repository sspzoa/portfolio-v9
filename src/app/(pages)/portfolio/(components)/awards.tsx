"use client";

import { useAwards } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";

export const AwardsSection = () => {
  const { data: awards = [], isLoading, isError } = useAwards();

  if (isLoading) {
    return (
      <Section title="Awards">
        <div className="flex flex-col gap-spacing-500">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Awards">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Awards">
      <div className="flex flex-col gap-spacing-500">
        {awards.map((award) => (
          <Card key={`${award.name}-${award.date}`} mainText={award.name} subText={`${award.date} / ${award.tier}`} />
        ))}
      </div>
    </Section>
  );
};
