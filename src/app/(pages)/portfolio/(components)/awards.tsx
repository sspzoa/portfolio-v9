"use client";

import { useAtomValue } from "jotai";
import { useAwards } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { AwardAtom } from "../(atoms)/usePortfolioStore";

export const AwardsSection = () => {
  const { isLoading } = useAwards();
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
      <div className="flex flex-col gap-spacing-500">
        {awards.map((award, index) => (
          <Card key={index} mainText={award.name} subText={`${award.date} / ${award.tier}`} />
        ))}
      </div>
    </Section>
  );
};
