import Image from "next/image";
import type { Project } from "@/shared/types";
import { Chip } from "@/shared/ui/chip";
import { Collapsible } from "@/shared/ui/collapsible";
import { Description } from "@/shared/ui/description";
import formatPeriod from "@/shared/utils/formatPeriod";

interface ProjectCardProps {
  project: Project;
}

// A-grade gallery card — renders in the 2-column project grid (P5).
export function ProjectCard({ project }: ProjectCardProps) {
  const period = formatPeriod(project.startDate, project.endDate);
  const caption = [project.teamSize ? `${project.teamSize}인` : null, project.shortDescription]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="group flex min-w-0 flex-col gap-spacing-300">
      {project.coverImage && (
        <div className="relative mb-spacing-100 aspect-video w-full overflow-hidden rounded-radius-md bg-components-fill-standard-secondary ring-1 ring-line-outline">
          <Image
            className="h-full w-full object-cover transition-transform duration-slow ease-standard group-hover:scale-[1.025]"
            src={project.coverImage}
            width={760}
            height={428}
            sizes="(max-width: 768px) 100vw, 380px"
            alt=""
            draggable={false}
          />
        </div>
      )}

      <div className="flex items-baseline justify-between gap-spacing-400">
        <h3 className="flex min-w-0 items-center gap-spacing-300 font-semibold text-content-standard-primary text-heading tracking-tight">
          {project.iconImage && (
            <span className="h-7 w-7 shrink-0 overflow-hidden rounded-radius-sm">
              <Image
                className="h-full w-full object-contain"
                width={28}
                height={28}
                src={project.iconImage}
                alt=""
                sizes="28px"
                draggable={false}
              />
            </span>
          )}
          <span className="truncate">{project.name}</span>
        </h3>
        {period && (
          <time className="shrink-0 font-mono text-content-standard-tertiary text-footnote tabular-nums">{period}</time>
        )}
      </div>

      {caption && <p className="text-content-standard-secondary text-label">{caption}</p>}

      {project.tags.length > 0 && (
        <div className="flex flex-row flex-wrap gap-spacing-150">
          {project.tags.map((tag) => (
            <Chip key={`${project.id}-${tag}`} name={tag} />
          ))}
        </div>
      )}

      {project.description && (
        <Collapsible maxHeight={84}>
          <Description>{project.description}</Description>
        </Collapsible>
      )}
    </article>
  );
}
