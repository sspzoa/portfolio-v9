import { getErrorMessage } from "@/shared/lib/errors";
import { fetchActivities } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { Chip } from "@/shared/ui/chip";
import { Section } from "@/shared/ui/section";
import formatPeriod from "@/shared/utils/formatPeriod";

export async function ActivitiesSection({ index, id }: SectionComponentProps) {
  try {
    const activities = await fetchActivities();
    if (activities.length === 0) return null;

    return (
      <Section id={id} title="Activities" index={index} count={activities.length}>
        <ul className="grid grid-cols-1 gap-x-spacing-800 md:grid-cols-2">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex flex-col gap-spacing-200 border-line-divider border-t py-spacing-400 first:border-t-0 md:[&:nth-child(-n+2)]:border-t-0">
              <div className="flex items-baseline justify-between gap-spacing-300">
                <p className="min-w-0 break-words font-medium text-content-standard-primary text-label">
                  {activity.name}
                </p>
                {(activity.startDate || activity.endDate) && (
                  <span className="shrink-0 font-mono text-content-standard-tertiary text-footnote tabular-nums">
                    {formatPeriod(activity.startDate, activity.endDate)}
                  </span>
                )}
              </div>
              {activity.role && (
                <p className="font-mono text-footnote text-content-standard-tertiary uppercase tracking-wider">
                  {activity.role}
                </p>
              )}
              {activity.hosts.length > 0 && (
                <div className="flex flex-row flex-wrap gap-spacing-150">
                  {activity.hosts.map((host) => (
                    <Chip key={`${activity.id}-${host}`} name={host} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Section>
    );
  } catch (error) {
    console.error("[ActivitiesSection]", error);

    return (
      <Section id={id} title="Activities" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
