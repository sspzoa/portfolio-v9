"use client";

import { motion } from "framer-motion";
import { LucideGithub, LucideInstagram, LucideLinkedin, LucideMail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.25, 0.1, 0.25, 1] as const;

const socialLinks = [
  { href: "https://github.com/sspzoa", icon: LucideGithub },
  { href: "https://linkedin.com/in/seungpyosuh", icon: LucideLinkedin },
  { href: "https://www.instagram.com/seuungpyo", icon: LucideInstagram },
  { href: "mailto:me@sspzoa.io", icon: LucideMail },
];

export const ProfileSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-spacing-700 p-spacing-400">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease }}
        className="overflow-hidden rounded-radius-400">
        <Image src="/photo.jpg" alt="Profile Photo" width={180} height={180} className="scale-105" draggable={false} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease }}
        className="font-semibold text-title md:text-display">
        sspzoa <span className="text-content-standard-secondary">Seungpyo Suh</span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease }}
        className="flex flex-row gap-spacing-500">
        {socialLinks.map((link) => (
          <Link
            key={link.href}
            className="duration-100 hover:opacity-50"
            href={link.href}
            rel="noopener noreferrer"
            target="_blank">
            <link.icon className="text-content-standard-secondary" size={32} />
          </Link>
        ))}
      </motion.div>
    </div>
  );
};
