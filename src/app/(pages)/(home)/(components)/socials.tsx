import { LucideGithub, LucideInstagram, LucideLinkedin, LucideMail } from "lucide-react";
import Link from "next/link";

export const socialLinks = [
  { href: "https://github.com/sspzoa", icon: LucideGithub, label: "GitHub" },
  { href: "https://linkedin.com/in/seungpyosuh", icon: LucideLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/seuungpyo", icon: LucideInstagram, label: "Instagram" },
  { href: "mailto:me@sspzoa.io", icon: LucideMail, label: "Email" },
];

interface SocialsProps {
  className?: string;
}

export function Socials({ className }: SocialsProps) {
  return (
    <div className={`flex flex-row gap-spacing-400 ${className ?? ""}`}>
      {socialLinks.map((link) => {
        const isExternal = link.href.startsWith("http");
        return (
          <Link
            key={link.href}
            aria-label={isExternal ? `${link.label} (새 창)` : link.label}
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="rounded-radius-200 text-content-standard-tertiary transition-colors hover:text-content-standard-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary">
            <link.icon size={18} strokeWidth={1.75} />
          </Link>
        );
      })}
    </div>
  );
}
