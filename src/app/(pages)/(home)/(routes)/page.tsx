"use client";

import { LucideArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-background-standard-primary px-spacing-500 py-spacing-1000">
      <div className="flex w-full max-w-3xl flex-col gap-spacing-800">
        <div className="flex flex-col gap-spacing-500">
          <h1 className="font-semibold text-content-standard-primary text-display tracking-tight md:text-[64px] md:leading-[1.05]">
            Seungpyo Suh<span className="text-core-accent">.</span>
          </h1>
          <p className="max-w-xl text-body text-content-standard-secondary md:text-heading">
            Mobile & Frontend Engineer crafting interfaces that feel like home.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-spacing-400 border-line-divider border-y py-spacing-500 md:grid-cols-2">
          <div className="flex flex-col gap-spacing-50">
            <dt className="text-content-standard-tertiary text-footnote">Education</dt>
            <dd className="font-medium text-content-standard-primary text-label">Dongguk University, Business '26</dd>
          </div>
          <div className="flex flex-col gap-spacing-50">
            <dt className="text-content-standard-tertiary text-footnote">Background</dt>
            <dd className="font-medium text-content-standard-primary text-label">Korea Digital Media HS, HD 22nd</dd>
          </div>
        </dl>

        <div className="flex flex-row items-center gap-spacing-400">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-spacing-200 rounded-radius-full bg-content-standard-primary px-spacing-500 py-spacing-300 font-semibold text-background-standard-primary text-label transition-opacity hover:opacity-90">
            Explore portfolio
            <LucideArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="mailto:me@sspzoa.io"
            className="font-medium text-content-standard-secondary text-label underline-offset-4 hover:text-content-standard-primary hover:underline">
            me@sspzoa.io
          </Link>
        </div>
      </div>
    </main>
  );
}
