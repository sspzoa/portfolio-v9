"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { ExperienceAtom } from "../(atoms)/usePortfolioStore";

export const ExperiencesSection = () => {
  const experiences = useAtomValue(ExperienceAtom);

  return (
    <Section title="Experiences">
      <div className="flex flex-col gap-spacing-800">
        {experiences.map((experience, index) => (
          <Card
            key={index}
            icon={experience.logo}
            mainText={`${experience.organization} - ${experience.role}`}
            subText={`${experience.startDate} ${experience.endDate ? `- ${experience.endDate}` : ""}`}
            description={experience.description}
          />
        ))}
      </div>
    </Section>
  );
};
