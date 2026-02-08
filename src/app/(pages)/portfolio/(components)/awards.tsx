"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import { StaggerContainer, StaggerItem } from "@/shared/components/motion";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { AwardAtom } from "../(atoms)/usePortfolioStore";

export const AwardsSection = ({ isLoading }: { isLoading: boolean }) => {
  const awards = useAtomValue(AwardAtom);

  if (isLoading) {
    return (
      <Section title="Awards">
        <div className="flex flex-col gap-spacing-500">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Awards">
      <StaggerContainer className="flex flex-col gap-spacing-500" staggerDelay={0.04}>
        {awards.map((award, index) => (
          <StaggerItem key={index}>
            <Card mainText={award.name} subText={`${award.date} / ${award.tier}`} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
};
