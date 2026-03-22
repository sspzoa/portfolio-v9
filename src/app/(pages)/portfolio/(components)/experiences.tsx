"use client";

import { useAtomValue } from "jotai";
import { useExperiences } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { ExperienceAtom } from "../(atoms)/usePortfolioStore";

export const ExperiencesSection = () => {
  const { isLoading } = useExperiences();
  const experiences = useAtomValue(ExperienceAtom);

  if (isLoading) {
    return (
      <Section title="Experiences">
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardSkeleton key={index} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

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
