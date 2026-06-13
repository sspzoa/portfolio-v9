import { Description } from "@/shared/components/description";
import Section from "@/shared/components/section";
import { fetchAboutMe } from "@/shared/lib/portfolio-data";

interface AboutMeSectionProps {
  index?: number;
}

export async function AboutMeSection({ index }: AboutMeSectionProps) {
  try {
    const aboutMe = await fetchAboutMe();

    return (
      <Section title="About" index={index}>
        <Description>{aboutMe.content}</Description>
      </Section>
    );
  } catch {
    return (
      <Section title="About" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
