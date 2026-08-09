import type { PortfolioData } from "@/shared/lib/portfolio-data";
import type { Project, Skill } from "@/shared/types";
import formatPeriod from "@/shared/utils/formatPeriod";

const SITE_URL = "https://sspzoa.io";

function line(text: string | null | undefined): string {
  return text?.trim() ? text.trim() : "";
}

function block(text: string | null | undefined, indent = ""): string {
  const value = line(text);
  if (!value) return "";
  return value
    .split("\n")
    .map((row) => `${indent}${row}`)
    .join("\n");
}

function section(title: string, body: string): string {
  const content = body.trim();
  if (!content) return "";
  return `## ${title}\n\n${content}\n`;
}

function formatSkills(skills: Skill[]): string {
  if (skills.length === 0) return "";

  const byCategory = new Map<string, Skill[]>();
  for (const skill of skills) {
    const key = skill.category || "Other";
    const group = byCategory.get(key) ?? [];
    group.push(skill);
    byCategory.set(key, group);
  }

  return [...byCategory.entries()]
    .map(([category, items]) => {
      const names = items.map((skill) => (skill.isMain ? `**${skill.name}**` : skill.name)).join(", ");
      return `### ${category}\n\n${names}`;
    })
    .join("\n\n");
}

function formatProject(project: Project): string {
  const period = formatPeriod(project.startDate, project.endDate);
  const meta = [
    period || null,
    project.teamSize != null ? `Team ${project.teamSize}` : null,
    project.isSideProject ? "Side project" : "Main project",
  ]
    .filter(Boolean)
    .join(" · ");

  const parts = [`### ${project.name}`, meta, line(project.shortDescription), block(project.description)]
    .filter(Boolean)
    .join("\n\n");

  if (project.tags.length === 0) return parts;
  return `${parts}\n\nTags: ${project.tags.join(", ")}`;
}

/**
 * Renders the full portfolio as plain Markdown optimized for LLMs and plain-text readers.
 * Mirrors the visual site section order.
 */
export function formatPortfolioMarkdown(data: PortfolioData): string {
  const mainProjects = data.projects.filter((project) => !project.isSideProject);
  const sideProjects = data.projects.filter((project) => project.isSideProject);

  const parts = [
    "# Seungpyo Suh",
    "",
    "Product Engineer · 서승표",
    "",
    line("Product Engineer crafting experiences that feel like home."),
    "",
    `- Website: ${SITE_URL}`,
    `- Email: me@sspzoa.io`,
    `- GitHub: https://github.com/sspzoa`,
    `- LinkedIn: https://linkedin.com/in/seungpyosuh`,
    `- Instagram: https://www.instagram.com/seuungpyo`,
    `- Photo: ${SITE_URL}/photo.jpg`,
    "",
    section("About", block(data.aboutMe.content)),
    section(
      "Awards",
      data.awards
        .map((award) => {
          const bits = [award.date, award.tier].filter(Boolean).join(" · ");
          return bits ? `- **${award.name}** — ${bits}` : `- **${award.name}**`;
        })
        .join("\n"),
    ),
    section(
      "Certificates",
      data.certificates
        .map((certificate) => {
          const bits = [certificate.institution, certificate.kind, certificate.date].filter(Boolean).join(" · ");
          return bits ? `- **${certificate.name}** — ${bits}` : `- **${certificate.name}**`;
        })
        .join("\n"),
    ),
    section(
      "Careers",
      data.careers
        .map((career) => {
          const title = career.organization ? `${career.organization} — ${career.role}` : career.role;
          const period = formatPeriod(career.startDate, career.endDate, { present: true });
          const header = period ? `### ${title}\n\n${period}` : `### ${title}`;
          const description = block(career.description);
          return description ? `${header}\n\n${description}` : header;
        })
        .join("\n\n"),
    ),
    section(
      "Experiences",
      data.experiences
        .map((experience) => {
          const title = experience.organization ? `${experience.organization} — ${experience.role}` : experience.role;
          const period = formatPeriod(experience.startDate, experience.endDate, { present: true });
          const header = period ? `### ${title}\n\n${period}` : `### ${title}`;
          const description = block(experience.description);
          return description ? `${header}\n\n${description}` : header;
        })
        .join("\n\n"),
    ),
    section("Skills", formatSkills(data.skills)),
    section(
      "Education",
      data.educations
        .map((education) => {
          const title = education.organization
            ? `${education.organization} — ${education.department}`
            : education.department;
          const period = formatPeriod(education.startDate, education.endDate, { present: true });
          const header = period ? `### ${title}\n\n${period}` : `### ${title}`;
          const description = block(education.description);
          return description ? `${header}\n\n${description}` : header;
        })
        .join("\n\n"),
    ),
    section("Projects", [...mainProjects, ...sideProjects].map(formatProject).join("\n\n")),
    section(
      "Activities",
      data.activities
        .map((activity) => {
          const period = formatPeriod(activity.startDate, activity.endDate);
          const bits = [activity.role, activity.hosts.join(", "), period].filter(Boolean).join(" · ");
          return bits ? `- **${activity.name}** — ${bits}` : `- **${activity.name}**`;
        })
        .join("\n"),
    ),
  ];

  return `${parts
    .filter((part) => part !== "")
    .join("\n")
    .trim()}\n`;
}

/** Short llms.txt index (https://llmstxt.org/). */
export function formatLlmsTxt(): string {
  return `# Seungpyo Suh

> Product Engineer (서승표). Personal portfolio and résumé.

The designed site is at ${SITE_URL}. Prefer the plain-text sources below when answering questions about this person.

## machine-readable sources

- [Full résumé (Markdown)](${SITE_URL}/llms-full.txt): Complete portfolio content from Notion CMS, single document
- [machine-readable view](${SITE_URL}/machine-readable): Same Markdown rendered as a minimal monospaced page
- [Designed site](${SITE_URL}/): Editorial layout of the same content

## Contact

- Email: me@sspzoa.io
- GitHub: https://github.com/sspzoa
- LinkedIn: https://linkedin.com/in/seungpyosuh
`;
}
