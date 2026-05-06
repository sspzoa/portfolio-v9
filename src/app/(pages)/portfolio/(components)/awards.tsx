"use client";

import { useAtomValue } from "jotai";
import { useAwards } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import ListItem from "@/shared/components/list-item";
import Section from "@/shared/components/section";
import { ListItemSkeleton } from "@/shared/components/skeleton";
import { AwardAtom } from "../(atoms)/usePortfolioStore";

export const AwardsSection = ({ index }: { index?: number }) => {
  const { isLoading } = useAwards();
  const awards = useAtomValue(AwardAtom);

  if (isLoading) {
    return (
      <Section title="Awards" index={index}>
        <ul className="flex flex-col">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListItemSkeleton key={i} />
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section title="Awards" index={index} count={awards.length}>
      <ul className="flex flex-col">
        {awards.map((award, i) => (
          <ListItem key={i} title={award.name} meta={award.date} badge={award.tier} isPinned={award.isPinned} />
        ))}
      </ul>
    </Section>
  );
};
