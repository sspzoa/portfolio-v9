"use client";

import { useCertificates } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";

export const CertificatesSection = () => {
  const { data: certificates = [], isLoading, isError } = useCertificates();

  if (isLoading) {
    return (
      <Section title="Certificates">
        <div className="flex flex-col gap-spacing-500">
          {Array.from({ length: 7 }).map((_, index) => (
            <CardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      </Section>
    );
  }

  if (isError) {
    return (
      <Section title="Certificates">
        <p className="text-content-standard-tertiary text-label">데이터를 불러오는 데 실패했습니다.</p>
      </Section>
    );
  }

  return (
    <Section title="Certificates">
      <div className="flex flex-col gap-spacing-500">
        {certificates.map((certificate) => (
          <Card
            key={`${certificate.name}-${certificate.date}`}
            mainText={certificate.name}
            subText={`${certificate.date} / ${certificate.kind} / ${certificate.institution}`}
          />
        ))}
      </div>
    </Section>
  );
};
