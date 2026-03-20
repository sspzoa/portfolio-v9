"use client";

import { LucideGithub, LucideInstagram, LucideLinkedin, LucideMail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/shared/components/motion";

const socialLinks = [
  { href: "https://github.com/sspzoa", icon: LucideGithub },
  { href: "https://linkedin.com/in/seungpyosuh", icon: LucideLinkedin },
  { href: "https://www.instagram.com/seuungpyo", icon: LucideInstagram },
  { href: "mailto:me@sspzoa.io", icon: LucideMail },
];

export const ProfileSection = () => {
  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-spacing-700 rounded-radius-400 bg-components-fill-standard-primary p-spacing-600 md:flex-row md:gap-spacing-800 md:p-spacing-800">
      <ScaleIn className="shrink-0 overflow-hidden rounded-radius-400">
        <Image src="/photo.jpg" alt="Profile Photo" width={180} height={180} className="scale-105" draggable={false} />
      </ScaleIn>
      <div className="flex flex-col items-center gap-spacing-500 md:items-start">
        <FadeIn delay={0.1}>
          <h1 className="font-semibold text-title md:text-display">
            sspzoa <span className="text-content-standard-secondary">Seungpyo Suh</span>
          </h1>
        </FadeIn>
        <StaggerContainer className="flex flex-row gap-spacing-500" staggerDelay={0.06}>
          {socialLinks.map((link) => (
            <StaggerItem key={link.href}>
              <Link
                className="duration-100 hover:opacity-50"
                href={link.href}
                rel="noopener noreferrer"
                target="_blank">
                <link.icon className="text-content-standard-secondary" size={32} />
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};
