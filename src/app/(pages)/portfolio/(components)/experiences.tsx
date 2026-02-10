"use client";

import { useAtomValue } from "jotai";
import { useExperiences } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import { StaggerContainer, StaggerItem } from "@/shared/components/motion";
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
      <StaggerContainer className="flex flex-col gap-spacing-800">
        {experiences.map((experience, index) => (
          <StaggerItem key={index}>
            <Card
              icon={experience.logo}
              mainText={`${experience.organization} - ${experience.role}`}
              subText={`${experience.startDate} ${experience.endDate ? `- ${experience.endDate}` : ""}`}
              description={experience.description}
            />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  );
};
