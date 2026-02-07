"use client";

import { motion, type Variants } from "framer-motion";
import type React from "react";

const ease = [0.25, 0.1, 0.25, 1] as const;

const getDirectionVariants = (direction: "up" | "down" | "left" | "right" = "up"): Variants => {
  const offset = 24;
  const map = {
    up: { hidden: { opacity: 0, y: offset }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -offset }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: offset }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: -offset }, visible: { opacity: 1, x: 0 } },
  };
  return map[direction];
};

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

export const FadeIn = ({ children, className, direction = "up", delay = 0, duration = 0.5 }: FadeInProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      variants={getDirectionVariants(direction)}
      className={className}>
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ children, className, staggerDelay = 0.06 }: StaggerContainerProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}>
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const StaggerItem = ({ children, className, direction = "up" }: StaggerItemProps) => {
  return (
    <motion.div variants={getDirectionVariants(direction)} transition={{ duration: 0.4, ease }} className={className}>
      {children}
    </motion.div>
  );
};

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const ScaleIn = ({ children, className, delay = 0, duration = 0.6 }: ScaleInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease }}
      className={className}>
      {children}
    </motion.div>
  );
};

export { motion };
