import { Description } from "@/shared/components/description";
import Section from "@/shared/components/section";
import { fetchAboutMe } from "@/shared/lib/portfolio-data";

interface SectionComponentProps {
  index?: number;
  id?: string;
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
  } catch {
    return (
      <Section id={id} title="About" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
