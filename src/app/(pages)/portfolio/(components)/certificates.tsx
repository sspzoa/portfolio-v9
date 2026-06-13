import ListItem from "@/shared/components/list-item";
import Section from "@/shared/components/section";
import { fetchCertificates } from "@/shared/lib/portfolio-data";

interface CertificatesSectionProps {
  index?: number;
}

export async function CertificatesSection({ index }: CertificatesSectionProps) {
  try {
    const certificates = await fetchCertificates();

    return (
      <Section title="Certificates" index={index} count={certificates.length}>
        <ul className="flex flex-col">
          {certificates.map((certificate, i) => (
            <ListItem
              key={i}
              title={certificate.name}
              meta={`${certificate.institution ?? ""} · ${certificate.kind ?? ""}`}
              badge={certificate.date ?? undefined}
            />
          ))}
        </ul>
      </Section>
    );
  } catch {
    return (
      <Section title="Certificates" index={index}>
        <p className="text-content-standard-secondary text-label">일시적으로 데이터를 불러올 수 없습니다.</p>
      </Section>
    );
  }
}
