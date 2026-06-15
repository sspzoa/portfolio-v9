import RecordRow from "@/shared/components/record-row";
import Section from "@/shared/components/section";
import { fetchCertificates, isConfigError } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";

function getErrorMessage(error: unknown): string {
  return isConfigError(error) ? "설정을 확인해 주세요." : "일시적으로 데이터를 불러올 수 없습니다.";
}

export async function CertificatesSection({ index, id }: SectionComponentProps) {
  try {
    const certificates = await fetchCertificates();
    if (certificates.length === 0) return null;

    return (
      <Section id={id} title="Certificates" index={index} count={certificates.length}>
        <ul className="flex flex-col">
          {certificates.map((certificate) => (
            <RecordRow
              key={certificate.id}
              title={certificate.name}
              meta={[certificate.institution, certificate.kind].filter(Boolean).join(" · ")}
              date={certificate.date}
            />
          ))}
        </ul>
      </Section>
    );
  } catch (error) {
    console.error("[CertificatesSection]", error);

    return (
      <Section id={id} title="Certificates" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(error)}</p>
      </Section>
    );
  }
}
