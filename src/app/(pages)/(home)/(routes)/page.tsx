"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
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
import Button from "@/shared/components/button";

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

  const router = useRouter();

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <div className="flex w-full max-w-dvh flex-col items-center justify-center gap-spacing-800 bg-core-accent aspect-square dark:bg-background-standard-primary">
        <span className="font-semibold text-display dark:text-core-accent">Seungpyo Suh</span>
        <span className="text-center text-body">
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
        <div>
          <Button onClick={() => router.push("/portfolio")} text="Explore my portfolio" />
        </div>
      </div>
    </div>
  );
}
