import { TAGLINE } from "@/shared/copy";
import { fetchAboutMe } from "@/shared/lib/portfolio-data";
import { plainFirstLine } from "@/shared/utils/plainFirstLine";

export async function Hero() {
  let tagline = TAGLINE;

  try {
    const aboutMe = await fetchAboutMe();
    tagline = plainFirstLine(aboutMe.content) || TAGLINE;
  } catch (error) {
    console.error("[Hero]", error);
  }

  return (
    <header id="top" className="flex scroll-mt-spacing-950 flex-col lg:scroll-mt-spacing-900">
      <p aria-hidden="true" className="font-mono text-content-standard-tertiary text-label">
        $ cat portfolio
      </p>
      <h1 className="mt-spacing-400 font-bold text-content-standard-primary text-hero">
        Seungpyo Suh<span className="text-content-standard-quaternary">_</span>
      </h1>
      <p className="mt-spacing-300 text-body text-content-standard-secondary">{tagline}</p>
    </header>
  );
}
