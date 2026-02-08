"use client";

import { useAtomValue } from "jotai";
import { Description } from "@/shared/components/description";
import Section from "@/shared/components/section";
import { DescriptionSkeleton } from "@/shared/components/skeleton";
import { AboutMeAtom } from "../(atoms)/usePortfolioStore";

export const AboutMeSection = ({ isLoading }: { isLoading: boolean }) => {
  const aboutme = useAtomValue(AboutMeAtom);

  if (isLoading) {
    return (
      <Section title="About me">
        <div className="flex flex-col gap-spacing-200">
          {Array.from({ length: 2 }).map((_, index) => (
            <DescriptionSkeleton key={index} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="About me">
      <Description>{aboutme?.content}</Description>
    </Section>
  );
};
