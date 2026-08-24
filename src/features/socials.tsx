import Link from "next/link";

export const socialLinks = [
  { href: "https://github.com/sspzoa", label: "GitHub" },
  { href: "https://linkedin.com/in/seungpyosuh", label: "LinkedIn" },
  { href: "https://www.instagram.com/seuungpyo", label: "Instagram" },
  { href: "mailto:me@sspzoa.io", label: "Email" },
];

const focusRing =
  "focus-visible:rounded-radius-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-core-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background-standard-primary";

interface SocialsProps {
  className?: string;
}

export function Socials({ className }: SocialsProps) {
  return (
    <ul className={`flex flex-row flex-wrap gap-x-spacing-400 gap-y-spacing-200 ${className ?? ""}`}>
      {socialLinks.map((link) => {
        const isExternal = link.href.startsWith("http");
        return (
          <li key={link.href}>
            <Link
              aria-label={isExternal ? `${link.label} (새 창)` : link.label}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={`font-mono text-content-standard-tertiary text-footnote transition-colors duration-fast hover:text-content-standard-primary ${focusRing}`}>
              {`[${link.label}]`}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
