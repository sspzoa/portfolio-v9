"use client";

import Link from "next/link";
import { GitHubCalendar } from "react-github-calendar";
import Section from "@/shared/components/section";

export const ContributionsSection = () => {
  return (
    <Section title="Contributions">
      <Link
        href="https://github.com/sspzoa"
        target="_blank"
        rel="noreferrer noopener"
        className="flex w-full items-center justify-center rounded-radius-400 border border-line-outline p-spacing-400 duration-100 hover:border-core-accent hover:bg-core-accent-translucent">
        <GitHubCalendar
          username="sspzoa"
          theme={{
            light: [
              "var(--components-fill-standard-secondary)",
              "rgba(255, 227, 0, 0.4)",
              "rgba(255, 227, 0, 0.6)",
              "rgba(255, 227, 0, 0.8)",
              "var(--core-accent)",
            ],
            dark: [
              "var(--components-fill-standard-secondary)",
              "rgba(255, 227, 0, 0.4)",
              "rgba(255, 227, 0, 0.6)",
              "rgba(255, 227, 0, 0.8)",
              "var(--core-accent)",
            ],
          }}
        />
      </Link>
    </Section>
  );
};
