import Image from "next/image";

export function Hero() {
  return (
    <header id="top" className="flex scroll-mt-spacing-950 flex-col lg:scroll-mt-spacing-900">
      <p aria-hidden="true" className="font-mono text-content-standard-tertiary text-label">
        $ cat portfolio
      </p>

      <div className="mt-spacing-400 flex flex-col-reverse gap-spacing-600 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h1 className="font-bold text-content-standard-primary text-hero">
            Seungpyo Suh<span className="text-content-standard-quaternary">_</span>
          </h1>
          <p className="mt-spacing-300 text-body text-content-standard-secondary">
            Product Engineer who decides what to build, then refines it until it's good.
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
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </header>
  );
}
