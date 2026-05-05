"use client";

import { useAtomValue } from "jotai";
import { useAboutMe } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import { Description } from "@/shared/components/description";
import Section from "@/shared/components/section";
import { DescriptionSkeleton } from "@/shared/components/skeleton";
import { AboutMeAtom } from "../(atoms)/usePortfolioStore";

export const AboutMeSection = ({ index }: { index?: number }) => {
  const { isLoading } = useAboutMe();
  const aboutme = useAtomValue(AboutMeAtom);

  if (isLoading) {
    return (
      <Section title="About" index={index}>
        <div className="flex flex-col gap-spacing-300">
          <DescriptionSkeleton />
          <DescriptionSkeleton />
        </div>
      </Section>
    );
  }

  return (
    <Section title="About" index={index}>
      <Description>{aboutme?.content}</Description>
    </Section>
  );
};
