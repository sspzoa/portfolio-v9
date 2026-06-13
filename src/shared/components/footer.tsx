export default function Footer() {
  return (
    <footer className="flex w-full max-w-5xl flex-col items-center gap-spacing-200 border-line-divider border-t pt-spacing-700">
      <p className="font-medium text-content-standard-tertiary text-footnote">Designed & built by Seungpyo Suh</p>
      <p className="text-caption text-content-standard-quaternary">
        © 2023–{new Date().getFullYear()} All rights reserved.
      </p>
    </footer>
  );
}
