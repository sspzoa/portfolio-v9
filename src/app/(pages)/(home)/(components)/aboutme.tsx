import { Description } from "@/shared/components/description";
import Section from "@/shared/components/section";
import { fetchAboutMe, isConfigError } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";

function getErrorMessage(error: unknown): string {
  return isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다.";
}

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
