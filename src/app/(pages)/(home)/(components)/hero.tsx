import Image from "next/image";
import { Socials } from "./socials";

export function Hero() {
  return (
    <header id="top" className="flex scroll-mt-spacing-800 flex-col gap-spacing-700 pb-spacing-200">
      <div className="flex flex-col-reverse gap-spacing-600 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-spacing-500">
          <h1 className="font-semibold text-content-standard-primary text-hero-sm md:text-hero-md lg:text-hero-lg">
            Seungpyo
            <br />
            Suh<span className="text-core-accent">.</span>
          </h1>
          <p className="max-w-md text-balance text-body text-content-standard-secondary md:text-heading">
            Product Engineer crafting experiences that feel like home.
          </p>
        </div>

        <div className="h-28 w-28 shrink-0 overflow-hidden rounded-radius-700 ring-1 ring-line-outline ring-inset md:h-36 md:w-36">
          <Image
            src="/photo.jpg"
            alt="Seungpyo Suh"
            width={160}
            height={160}
            sizes="(min-width: 768px) 144px, 112px"
            priority
            className="h-full w-full scale-105 object-cover"
            draggable={false}
          />
        </div>
      </div>

      <Socials className="lg:hidden" />
    </header>
  );
}
