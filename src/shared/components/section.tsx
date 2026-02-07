"use client";

import { motion } from "framer-motion";
import type React from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease }}
      className="flex w-full flex-col items-start gap-spacing-400 rounded-radius-400 bg-components-fill-standard-primary p-spacing-500 md:p-spacing-600">
      <h2 className="font-semibold text-body">{title}</h2>
      <div className="w-full">{children}</div>
    </motion.section>
  );
}
