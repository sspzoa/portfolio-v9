export default function Footer() {
  return (
    <footer className="flex w-full flex-col gap-spacing-150 border-line-divider border-t pt-spacing-700">
      <p className="font-medium font-mono text-content-standard-tertiary text-footnote uppercase tracking-widest">
        Designed & built by Seungpyo Suh
      </p>
      <p className="font-mono text-caption text-content-standard-quaternary">
        © 2023–{new Date().getFullYear()} · All rights reserved
      </p>
    </footer>
  );
}
