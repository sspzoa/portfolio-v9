"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import Section from "@/shared/components/section";

const GitHubCalendar = dynamic(() => import("react-github-calendar").then((mod) => mod.GitHubCalendar), {
  ssr: false,
  loading: () => (
    <div className="flex h-32 w-full animate-pulse items-center justify-center rounded-radius-400 bg-components-fill-standard-secondary">
      <span className="text-content-standard-tertiary text-footnote">Loading contributions...</span>
    </div>
  ),
});

interface ContributionsSectionProps {
  index?: number;
}

export const ContributionsSection = ({ index }: ContributionsSectionProps) => {
  return (
    <Section title="Contributions" index={index}>
      <Link
        href="https://github.com/sspzoa"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="View GitHub profile"
        className="block w-full transition-opacity hover:opacity-70">
        <GitHubCalendar
          username="sspzoa"
          theme={{
            light: [
              "var(--components-translucent-tertiary)",
              "rgba(85, 117, 158, 0.3)",
              "rgba(85, 117, 158, 0.55)",
              "rgba(85, 117, 158, 0.8)",
              "var(--core-accent)",
            ],
            dark: [
              "var(--components-translucent-tertiary)",
              "rgba(143, 175, 213, 0.25)",
              "rgba(143, 175, 213, 0.5)",
              "rgba(143, 175, 213, 0.75)",
              "var(--core-accent)",
            ],
          }}
        />
      </Link>
    </Section>
  );
};
