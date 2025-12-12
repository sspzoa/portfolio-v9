"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CareerAtom } from "../(atoms)/usePortfolioStore";

export const CareersSection = () => {
  const careers = useAtomValue(CareerAtom);

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
