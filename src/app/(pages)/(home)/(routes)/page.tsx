import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-spacing-800 overflow-hidden bg-background-standard-primary">
        <div className="relative z-10 flex flex-col items-center gap-spacing-800">
          <div className="font-semibold text-display">Seungpyo Suh</div>

          <span className="text-center text-body">
            Mobile & Frontend Engineer
            <br />
            Dongguk University Business '26
            <br />
            Korea Digital Media High School HD 22nd
          </span>

          <Link
            href="/portfolio"
            className="flex items-center justify-center rounded-radius-400 bg-components-translucent-primary px-spacing-600 py-spacing-400 font-semibold text-content-standard-secondary text-label duration-100 hover:bg-components-interactive-hover focus:bg-components-interactive-focused active:bg-components-interactive-pressed">
            Explore my portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
