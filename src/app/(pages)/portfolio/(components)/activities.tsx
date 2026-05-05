"use client";

import { useAtomValue } from "jotai";
import { useActivities } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Section from "@/shared/components/section";
import Tag from "@/shared/components/tag";
import { ActivityAtom } from "../(atoms)/usePortfolioStore";

export const ActivitiesSection = ({ index }: { index?: number }) => {
  const { isLoading } = useActivities();
  const activities = useAtomValue(ActivityAtom);

  if (isLoading) {
    return (
      <Section title="Activities" index={index}>
        <ul className="grid grid-cols-1 gap-x-spacing-500 md:grid-cols-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <li key={i} className="flex flex-col gap-spacing-200 border-line-divider border-b py-spacing-400">
              <div className="h-[18px] w-2/3 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
              <div className="h-[14px] w-1/2 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
              <div className="flex flex-row gap-spacing-150">
                <div className="h-[24px] w-16 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
                <div className="h-[24px] w-20 animate-pulse rounded-radius-full bg-components-fill-standard-secondary" />
              </div>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section title="Activities" index={index} count={activities.length}>
      <ul className="grid grid-cols-1 gap-x-spacing-500 md:grid-cols-2">
        {activities.map((activity, i) => (
          <li
            key={i}
            className="flex flex-col gap-spacing-200 border-line-divider border-b py-spacing-400 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0">
            <div className="flex flex-col">
              <p className="font-medium text-content-standard-primary text-label">{activity.name}</p>
              <p className="text-content-standard-tertiary text-footnote">
                {activity.role} · {activity.startDate}
                {activity.endDate ? ` – ${activity.endDate}` : ""}
              </p>
            </div>
            {activity.hosts.length > 0 && (
              <div className="flex flex-row flex-wrap gap-spacing-150">
                {activity.hosts.map((host, j) => (
                  <Tag key={j} name={host} />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
};
