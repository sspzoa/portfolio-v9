"use client";

import { useAtomValue } from "jotai";
import { useCertificates } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CardSkeleton } from "@/shared/components/skeleton";
import { CertificationAtom } from "../(atoms)/usePortfolioStore";

export const CertificatesSection = () => {
  const { isLoading } = useCertificates();
  const certificates = useAtomValue(CertificationAtom);

  if (isLoading) {
    return (
      <Section title="Certificates">
        <div className="flex flex-col gap-spacing-500">
          {Array.from({ length: 7 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Certificates">
      <div className="flex flex-col gap-spacing-500">
        {certificates.map((certificate, index) => (
          <Card
            key={index}
            mainText={certificate.name}
            subText={`${certificate.date} / ${certificate.kind} / ${certificate.institution}`}
          />
        ))}
      </div>
    </Section>
  );
};
