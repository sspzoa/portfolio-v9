"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { ActivityAtom } from "../(atoms)/usePortfolioStore";

export const ActivitiesSection = () => {
  const activities = useAtomValue(ActivityAtom);

  return (
    <Section title="Activities">
      <div className="grid grid-cols-1 gap-spacing-800 md:grid-cols-2">
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
