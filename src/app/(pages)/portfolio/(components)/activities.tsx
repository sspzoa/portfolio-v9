"use client";

import { useAtomValue } from "jotai";
import { useActivities } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { ActivityAtom } from "../(atoms)/usePortfolioStore";

export const ActivitiesSection = () => {
  const { isLoading } = useActivities();
  const activities = useAtomValue(ActivityAtom);

  if (isLoading) {
    return (
      <Section title="Activities">
        <div className="grid grid-cols-1 gap-spacing-400 md:grid-cols-2">
          {Array.from({ length: 19 }).map((_, index) => (
            <CardSkeleton key={index} hasTags />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Activities">
      <div className="grid grid-cols-1 gap-spacing-400 md:grid-cols-2">
        {activities.map((activitie, index) => (
          <Card
            key={index}
            mainText={activitie.name}
            subText={`${activitie.startDate} ${activitie.endDate ? `- ${activitie.endDate}` : ""} / ${activitie.role}`}
            tags={activitie.hosts}
          />
        ))}
      </div>
    </Section>
  );
};
