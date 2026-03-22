import type React from "react";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

export const FadeIn = ({ children, className }: FadeInProps) => {
  return <div className={className}>{children}</div>;
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerContainer = ({ children, className }: StaggerContainerProps) => {
  return <div className={className}>{children}</div>;
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export const StaggerItem = ({ children, className }: StaggerItemProps) => {
  return <div className={className}>{children}</div>;
};

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export const ScaleIn = ({ children, className }: ScaleInProps) => {
  return <div className={className}>{children}</div>;
};
