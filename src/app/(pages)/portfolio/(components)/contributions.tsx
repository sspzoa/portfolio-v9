"use client";

import Link from "next/link";
import { GitHubCalendar } from "react-github-calendar";
import Section from "@/shared/components/section";

export const ContributionsSection = ({ index }: { index?: number }) => {
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
