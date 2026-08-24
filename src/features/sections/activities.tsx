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
        <ul className="flex flex-col">
          {activities.map((activity) => {
            const period =
              activity.startDate || activity.endDate ? formatPeriod(activity.startDate, activity.endDate) : null;
            return (
              <li
                key={activity.id}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-spacing-200 gap-y-spacing-150 border-line-divider border-t py-spacing-400 first:border-t-0 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-baseline">
                <span
                  aria-hidden="true"
                  className="row-start-1 shrink-0 select-none font-mono text-content-standard-quaternary text-label">
                  [+]
                </span>
                <div className="min-w-0">
                  <p className="break-keep font-medium text-content-standard-primary text-label">{activity.name}</p>
                  {activity.role && (
                    <p className="font-mono text-content-standard-tertiary text-footnote">{activity.role}</p>
                  )}
                  {activity.hosts.length > 0 && (
                    <div className="mt-spacing-150 flex flex-row flex-wrap gap-x-spacing-300 gap-y-spacing-100">
                      {activity.hosts.map((host) => (
                        <Chip key={`${activity.id}-${host}`} name={host} />
                      ))}
                    </div>
                  )}
                </div>
                {period && (
                  <span className="col-start-2 font-mono text-content-standard-tertiary text-footnote tabular-nums md:col-start-3 md:row-start-1">
                    {period}
                  </span>
                )}
              </li>
            );
          })}
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
