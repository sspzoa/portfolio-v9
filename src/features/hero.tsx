export function Hero() {
  return (
    <header id="top" className="flex scroll-mt-spacing-950 flex-col lg:scroll-mt-spacing-900">
      <p aria-hidden="true" className="font-mono text-content-standard-tertiary text-label">
        $ cat portfolio
      </p>
      <h1 className="mt-spacing-400 font-bold text-content-standard-primary text-hero">
        Seungpyo Suh<span className="text-content-standard-quaternary">_</span>
      </h1>
      <p className="mt-spacing-300 text-body text-content-standard-secondary">
        Product Engineer who decides what to build, then refines it until it's good.
      </p>
    </header>
  );
}
