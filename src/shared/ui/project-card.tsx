import Image from "next/image";
import type { Project } from "@/shared/types";
import { Chip } from "@/shared/ui/chip";
import { Collapsible } from "@/shared/ui/collapsible";
import { Description } from "@/shared/ui/description";
import formatPeriod from "@/shared/utils/formatPeriod";

interface ProjectCardProps {
  project: Project;
}

// Flat gallery card — sharp hairline-framed cover, mono captions. 2-column grid.
export function ProjectCard({ project }: ProjectCardProps) {
  const period = formatPeriod(project.startDate, project.endDate);
  const caption = [project.teamSize ? `${project.teamSize}인` : null, project.shortDescription]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="flex min-w-0 flex-col gap-spacing-300">
      {project.coverImage && (
        <div className="relative mb-spacing-100 aspect-video w-full overflow-hidden border border-line-outline bg-components-fill-standard-secondary">
          <Image
            className="h-full w-full object-cover"
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
        <h3 className="flex min-w-0 items-center gap-spacing-200 font-bold text-content-standard-primary text-heading">
          <span
            aria-hidden="true"
            className="shrink-0 select-none font-mono font-normal text-content-standard-quaternary text-label">
            [+]
          </span>
          {project.iconImage && (
            <span className="h-7 w-7 shrink-0 overflow-hidden">
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
        <div className="flex flex-row flex-wrap gap-x-spacing-300 gap-y-spacing-150">
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
