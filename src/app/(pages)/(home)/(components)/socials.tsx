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
      {socialLinks.map((link) => (
        <Link
          key={link.href}
          aria-label={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-content-standard-tertiary transition-colors hover:text-content-standard-primary">
          <link.icon size={18} strokeWidth={1.75} />
        </Link>
      ))}
    </div>
  );
}
