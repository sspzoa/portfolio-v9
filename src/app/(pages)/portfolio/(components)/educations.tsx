"use client";

import { useAtomValue } from "jotai";
import { useEducations } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { EducationAtom } from "../(atoms)/usePortfolioStore";

export const EducationsSection = ({ index }: { index?: number }) => {
  const { isLoading } = useEducations();
  const educations = useAtomValue(EducationAtom);

  if (isLoading) {
    return (
      <Section title="Educations" index={index}>
        <div className="flex flex-col gap-spacing-700">
          {Array.from({ length: 1 }).map((_, i) => (
            <CardSkeleton key={i} hasDescription />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Educations" index={index} count={educations.length}>
      <div className="flex flex-col gap-spacing-700">
        {educations.map((education, i) => (
          <Card
            key={i}
            icon={education.logo}
            mainText={`${education.organization} · ${education.department}`}
            subText={`${education.startDate}${education.endDate ? ` – ${education.endDate}` : " – Present"}`}
            description={education.description}
          />
        ))}
      </div>
    </Section>
  );
};
