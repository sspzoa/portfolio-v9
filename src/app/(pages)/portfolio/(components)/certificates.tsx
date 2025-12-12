"use client";

import { useAtomValue } from "jotai";
import Card from "@/shared/components/card";
import Section from "@/shared/components/section";
import { CertificationAtom } from "../(atoms)/usePortfolioStore";

export const CertificatesSection = () => {
  const certificates = useAtomValue(CertificationAtom);

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
