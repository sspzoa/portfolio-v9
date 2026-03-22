"use client";

import { useAboutMe } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import { Description } from "@/shared/components/description";
import Section from "@/shared/components/section";
import { DescriptionSkeleton } from "@/shared/components/skeleton";

export const AboutMeSection = () => {
  const { data: aboutme, isLoading, isError } = useAboutMe();

  if (isLoading) {
    return (
      <Section title="About me">
        <div className="flex flex-col gap-spacing-200">
          {Array.from({ length: 2 }).map((_, index) => (
            <DescriptionSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="About me">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="About me">
      <Description>{aboutme?.content}</Description>
    </Section>
  );
};
