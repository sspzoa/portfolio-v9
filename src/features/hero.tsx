import Image from "next/image";
import { Socials } from "./socials";

export function Hero() {
  return (
    <header
      id="top"
      className="flex scroll-mt-spacing-950 flex-col gap-spacing-700 pb-spacing-200 lg:scroll-mt-spacing-900">
      <div className="flex flex-col gap-spacing-600">
        <p aria-hidden="true" className="font-mono text-content-standard-tertiary text-label">
          $ whoami
        </p>

        <div className="flex flex-col-reverse gap-spacing-600 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-spacing-400">
            <h1 className="font-bold text-content-standard-primary text-hero">
              Seungpyo Suh<span className="text-content-standard-quaternary">_</span>
            </h1>
            <p className="max-w-md text-balance text-body text-content-standard-secondary">
              Product Engineer crafting experiences that feel like home.
            </p>
          </div>

          <div className="h-24 w-24 shrink-0 overflow-hidden border border-line-outline bg-components-fill-standard-secondary md:h-32 md:w-32">
            <Image
              src="/photo.jpg"
              alt="Seungpyo Suh"
              width={160}
              height={160}
              sizes="(min-width: 768px) 128px, 96px"
              priority
              className="h-full w-full scale-105 object-cover"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <Socials className="lg:hidden" />
    </header>
  );
}
