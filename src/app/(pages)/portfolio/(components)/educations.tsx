"use client";

import { useAtomValue } from "jotai";
import { useEducations } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { EducationAtom } from "../(atoms)/usePortfolioStore";

export const EducationsSection = () => {
  const { isLoading } = useEducations();
  const educations = useAtomValue(EducationAtom);

  if (isLoading) {
    return (
      <Section title="Educations">
        <div className="flex flex-col gap-spacing-800">
          {Array.from({ length: 1 }).map((_, index) => (
            <CardSkeleton key={index} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Educations">
      <div className="flex flex-col gap-spacing-800">
        {educations.map((education, index) => (
          <Card
            key={index}
            icon={education.logo}
            mainText={`${education.organization} - ${education.department}`}
            subText={`${education.startDate} ${education.endDate ? `- ${education.endDate}` : ""}`}
            description={education.description}
          />
        ))}
      </div>
    </Section>
  );
};
