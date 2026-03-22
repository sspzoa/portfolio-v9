"use client";

import { useAtomValue } from "jotai";
import { useCareers } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { CareerAtom } from "../(atoms)/usePortfolioStore";

export const CareersSection = () => {
  const { isLoading } = useCareers();
  const careers = useAtomValue(CareerAtom);

  if (isLoading) {
    return (
      <Section title="Careers">
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 1 }).map((_, index) => (
            <CardSkeleton key={index} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Careers">
      <div className="flex flex-col gap-spacing-800">
        {careers.map((career, index) => (
          <Card
            key={index}
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
