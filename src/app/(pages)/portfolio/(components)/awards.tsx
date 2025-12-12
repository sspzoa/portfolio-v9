"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { AwardAtom } from "../(atoms)/usePortfolioStore";

export const AwardsSection = () => {
  const awards = useAtomValue(AwardAtom);

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
