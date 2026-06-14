import Image from "next/image";
import Chip from "@/shared/components/chip";
import { Description } from "@/shared/components/description";
import type { Project } from "@/shared/types";
import formatPeriod from "@/shared/utils/formatPeriod";

interface ProjectItemProps {
  project: Project;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  const period = formatPeriod(project.startDate, project.endDate);
  const caption = [project.teamSize ? `${project.teamSize}인` : null, project.shortDescription]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="reveal group flex flex-col gap-spacing-400 border-line-divider border-t pt-spacing-700 first:border-t-0 first:pt-0">
      <div className="flex items-baseline justify-between gap-spacing-400">
        <h3 className="flex min-w-0 items-center gap-spacing-300 font-semibold text-content-standard-primary text-heading tracking-tight">
          {project.iconImage && (
            <Image
              className="h-7 w-7 shrink-0 rounded-radius-200 object-contain"
              width={28}
              height={28}
              src={project.iconImage}
              alt=""
              draggable={false}
            />
          )}
          <span className="truncate">{project.name}</span>
        </h3>
        {period && (
          <span className="shrink-0 font-mono text-content-standard-tertiary text-footnote tabular-nums">{period}</span>
        )}
      </div>

      {caption && <p className="text-content-standard-secondary text-label">{caption}</p>}

      {project.coverImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-radius-400 ring-1 ring-line-outline ring-inset">
          <Image
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            src={project.coverImage}
            width={760}
            height={428}
            sizes="(max-width: 768px) 100vw, 760px"
            alt=""
            draggable={false}
          />
        </div>
      )}

      {project.tags.length > 0 && (
        <div className="flex flex-row flex-wrap gap-spacing-150">
          {project.tags.map((tag, i) => (
            <Chip key={i} name={tag} />
          ))}
        </div>
      )}

      {project.description && <Description maxHeight={240}>{project.description}</Description>}
    </article>
  );
}
