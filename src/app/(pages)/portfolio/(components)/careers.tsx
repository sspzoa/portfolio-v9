"use client";

import { useAtomValue } from "jotai";
import { useCareers } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { CareerAtom } from "../(atoms)/usePortfolioStore";

export const CareersSection = ({ index }: { index?: number }) => {
  const { isLoading } = useCareers();
  const careers = useAtomValue(CareerAtom);

  if (isLoading) {
    return (
      <Section title="Careers" index={index}>
        <div className="flex flex-col gap-spacing-700">
          {Array.from({ length: 1 }).map((_, i) => (
            <CardSkeleton key={i} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Careers" index={index} count={careers.length}>
      <div className="flex flex-col gap-spacing-700">
        {careers.map((career, i) => (
          <Card
            key={i}
            icon={career.logo}
            mainText={`${career.organization} · ${career.role}`}
            subText={`${career.startDate}${career.endDate ? ` – ${career.endDate}` : " – Present"}`}
            description={career.description}
          />
        ))}
      </div>
    </Section>
  );
};
