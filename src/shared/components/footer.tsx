"use client";

import { FadeIn } from "@/shared/components/motion";

export default function Footer() {
  return (
    <FadeIn>
      <span className="text-center font-semibold text-content-standard-secondary text-label">
        &copy; 2023-{new Date().getFullYear()} Seungpyo Suh.
        <br />
        All rights reserved.
      </span>
    </FadeIn>
  );
}
