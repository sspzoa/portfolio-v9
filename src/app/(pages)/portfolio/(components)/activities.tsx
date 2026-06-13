import Section from "@/shared/components/section";
import Tag from "@/shared/components/tag";
import { fetchActivities } from "@/shared/lib/portfolio-data";

interface ActivitiesSectionProps {
  index?: number;
}

export async function ActivitiesSection({ index }: ActivitiesSectionProps) {
  try {
    const activities = await fetchActivities();

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
  } catch {
    return (
      <Section title="Activities" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
