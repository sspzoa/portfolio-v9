"use client";

import { useActivities } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";

export const ActivitiesSection = () => {
  const { data: activities = [], isLoading, isError } = useActivities();

  if (isLoading) {
    return (
      <Section title="Activities">
        <div className="grid grid-cols-1 gap-spacing-400 md:grid-cols-2">
          {Array.from({ length: 19 }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} hasTags />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Activities">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Activities">
      <div className="grid grid-cols-1 gap-spacing-400 md:grid-cols-2">
        {activities.map((activity) => (
          <Card
            key={`${activity.name}-${activity.startDate}`}
            mainText={activity.name}
            subText={`${activity.startDate} ${activity.endDate ? `- ${activity.endDate}` : ""} / ${activity.role}`}
            tags={activity.hosts}
          />
        ))}
      </div>
    </Section>
  );
};
