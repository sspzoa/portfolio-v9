"use client";

import Link from "next/link";
import {
  useAboutMe,
  useActivities,
  useAwards,
  useCareers,
  useCertificates,
  useEducations,
  useExperiences,
  useProjects,
  useSkills,
} from "@/app/(pages)/portfolio/(hooks)/usePortfolio";

export default function Home() {
  useAboutMe();
  useSkills();
  useCareers();
  useExperiences();
  useEducations();
  useAwards();
  useCertificates();
  useProjects();
  useActivities();

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <div className="flex h-dvh w-full max-w-dvh flex-col items-center justify-center gap-spacing-800 bg-core-accent md:aspect-square">
        <span className="font-semibold text-display text-solid-black">Seungpyo Suh</span>
        <span className="text-center font-semibold text-body text-solid-black">
          Mobile & Frontend Engineer
          <br />
          belong to{" "}
          <Link
            className="duration-100 hover:opacity-50"
            href="https://github.com/dimipay"
            target="_blank"
            rel="noreferrer noopener">
            @dimipay
          </Link>
          ,{" "}
          <Link
            className="duration-100 hover:opacity-50"
            href="https://github.com/dimigo-din"
            target="_blank"
            rel="noreferrer noopener">
            @dimigo-din
          </Link>
          <br />
          Korea Digital Media High School 22nd
        </span>
        <Link
          href="/portfolio"
          className="flex cursor-pointer flex-row gap-spacing-400 rounded-radius-400 bg-components-translucent-primary p-spacing-400 duration-100 hover:bg-components-interactive-hover focus:bg-components-interactive-focused active:bg-components-interactive-pressed">
          <span className="text-body text-solid-black">Explore my portfolio!</span>
        </Link>
      </div>
    </div>
  );
}
