import { getErrorMessage } from "@/shared/lib/errors";
import { fetchAwards, fetchCertificates, fetchEducations } from "@/shared/lib/portfolio-data";
import type { SectionComponentProps } from "@/shared/types";
import { RecordGroup } from "@/shared/ui/record-group";
import { RecordRow } from "@/shared/ui/record-row";
import { Section } from "@/shared/ui/section";
import { TimelineEntry } from "@/shared/ui/timeline-entry";
import formatPeriod from "@/shared/utils/formatPeriod";

const SOURCES = ["educations", "awards", "certificates"] as const;

// Consolidates Educations + Awards + Certificates into one section (P5).
// Each source degrades independently, matching the old per-section behavior.
export async function RecordsSection({ index, id }: SectionComponentProps) {
  const results = await Promise.allSettled([fetchEducations(), fetchAwards(), fetchCertificates()]);

  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`[RecordsSection:${SOURCES[i]}]`, result.reason);
    }
  });

  const [educationsR, awardsR, certificatesR] = results;
  const firstError = results.find((result): result is PromiseRejectedResult => result.status === "rejected");

  if (firstError && results.every((result) => result.status === "rejected")) {
    return (
      <Section id={id} title="Records" index={index}>
        <p className="text-content-standard-secondary text-label">{getErrorMessage(firstError.reason)}</p>
      </Section>
    );
  }

  const educations = educationsR.status === "fulfilled" ? educationsR.value : [];
  const awards = awardsR.status === "fulfilled" ? awardsR.value : [];
  const certificates = certificatesR.status === "fulfilled" ? certificatesR.value : [];
  const total = educations.length + awards.length + certificates.length;

  if (total === 0) return null;

  return (
    <Section id={id} title="Records" index={index} count={total}>
      <div className="flex flex-col gap-spacing-700">
        {educations.length > 0 && (
          <RecordGroup title="Education">
            <div className="flex flex-col gap-spacing-600">
              {educations.map((education) => (
                <TimelineEntry
                  key={education.id}
                  period={formatPeriod(education.startDate, education.endDate, { present: true })}
                  title={education.organization ?? education.department}
                  subtitle={education.organization ? education.department : null}
                  logo={education.logo}
                  description={education.description}
                />
              ))}
            </div>
          </RecordGroup>
        )}

        {awards.length > 0 && (
          <RecordGroup title="Awards">
            <ul className="flex flex-col">
              {awards.map((award) => (
                <RecordRow key={award.id} title={award.name} badge={award.tier} date={award.date} />
              ))}
            </ul>
          </RecordGroup>
        )}

        {certificates.length > 0 && (
          <RecordGroup title="Certificates">
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
          </RecordGroup>
        )}
      </div>
    </Section>
  );
}
