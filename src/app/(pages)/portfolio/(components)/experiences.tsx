"use client";

import { useAtomValue } from "jotai";
import { useExperiences } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { ExperienceAtom } from "../(atoms)/usePortfolioStore";

export const ExperiencesSection = ({ index }: { index?: number }) => {
  const { isLoading } = useExperiences();
  const experiences = useAtomValue(ExperienceAtom);

  if (isLoading) {
    return (
      <Section title="Experiences" index={index}>
        <div className="flex flex-col gap-spacing-700">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Experiences" index={index} count={experiences.length}>
      <div className="flex flex-col gap-spacing-700">
        {experiences.map((experience, i) => (
          <Card
            key={i}
            icon={experience.logo}
            mainText={`${experience.organization} · ${experience.role}`}
            subText={`${experience.startDate}${experience.endDate ? ` – ${experience.endDate}` : " – Present"}`}
            description={experience.description}
          />
        ))}
      </div>
    </Section>
  );
};
