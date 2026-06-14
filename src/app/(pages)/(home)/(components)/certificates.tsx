import RecordRow from "@/shared/components/record-row";
import Section from "@/shared/components/section";
import { fetchCertificates } from "@/shared/lib/portfolio-data";

interface SectionComponentProps {
  index?: number;
  id?: string;
}

export async function CertificatesSection({ index, id }: SectionComponentProps) {
  try {
    const certificates = await fetchCertificates();
    if (certificates.length === 0) return null;

    return (
      <Section id={id} title="Certificates" index={index} count={certificates.length}>
        <ul className="flex flex-col">
          {certificates.map((certificate, i) => (
            <RecordRow
              key={i}
              title={certificate.name}
              meta={[certificate.institution, certificate.kind].filter(Boolean).join(" · ")}
              date={certificate.date ?? undefined}
            />
          ))}
        </ul>
      </Section>
    );
  } catch {
    return (
      <Section id={id} title="Certificates" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
