import { getErrorMessage } from "@/shared/lib/errors";
import { fetchAboutMe } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { Description } from "@/shared/ui/description";
import { Section } from "@/shared/ui/section";

export async function AboutMeSection({ index, id }: SectionComponentProps) {
  try {
    const aboutMe = await fetchAboutMe();

    return (
      <Section id={id} title="About" index={index}>
        <div className="max-w-2xl">
          <Description>{aboutMe.content}</Description>
        </div>
      </Section>
    );
  } catch (error) {
    console.error("[AboutMeSection]", error);

    return (
      <Section id={id} title="About" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
