"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { EducationAtom } from "../(atoms)/usePortfolioStore";

export const EducationsSection = () => {
  const educations = useAtomValue(EducationAtom);

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
