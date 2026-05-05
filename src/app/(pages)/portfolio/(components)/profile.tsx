"use client";

import { LucideGithub, LucideInstagram, LucideLinkedin, LucideMail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { href: "https://github.com/sspzoa", icon: LucideGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/seungpyosuh", icon: LucideLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/seuungpyo", icon: LucideInstagram, label: "Instagram" },
  { href: "mailto:me@sspzoa.io", icon: LucideMail, label: "Email" },
];

export const ProfileSection = () => {
  return (
    <header className="flex w-full flex-col gap-spacing-700 py-spacing-800">
      <div className="flex flex-col-reverse items-start gap-spacing-600 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-spacing-500">
          <h1 className="font-semibold text-content-standard-primary text-display tracking-tight md:text-[64px] md:leading-[1.05]">
            Seungpyo Suh<span className="text-core-accent">.</span>
          </h1>
          <p className="max-w-md text-body text-content-standard-secondary md:text-heading">
            Mobile & Frontend Engineer crafting interfaces that feel like home.
          </p>
        </div>

        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-radius-full ring-1 ring-line-outline md:h-40 md:w-40">
          <Image
            src="/photo.jpg"
            alt="Seungpyo Suh"
            width={160}
            height={160}
            className="h-full w-full scale-105 object-cover"
            draggable={false}
          />
        </div>
      </div>

      <div className="flex flex-row gap-spacing-300">
        {socialLinks.map((link) => (
          <Link
            key={link.href}
            aria-label={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-radius-full text-content-standard-secondary ring-1 ring-line-outline ring-inset transition-colors hover:bg-components-interactive-hover hover:text-content-standard-primary">
            <link.icon size={18} />
          </Link>
        ))}
      </div>
    </header>
  );
};
