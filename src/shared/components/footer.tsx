"use client";

export default function Footer() {
  return (
    <span className="text-center font-semibold text-content-standard-secondary text-label">
      &copy; 2023-{new Date().getFullYear()} Seungpyo Suh.
      <br />
      All rights reserved.
    </span>
  );
}
