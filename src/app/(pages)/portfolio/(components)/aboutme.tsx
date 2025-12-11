"use client";

import { useAtomValue } from "jotai";
import { Description } from "@/shared/components/description";
import Section from "@/shared/components/section";
import { AboutMeAtom } from "../(atoms)/usePortfolioStore";

export const AboutMeSection = () => {
  const aboutme = useAtomValue(AboutMeAtom);

  return (
    <Section title="About me">
      <Description>{aboutme?.content}</Description>
    </Section>
  );
};
