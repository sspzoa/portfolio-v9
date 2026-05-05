"use client";

import { useAtomValue } from "jotai";
import { useCertificates } from "@/app/(pages)/portfolio/(hooks)/usePortfolio";
import ListItem from "@/shared/components/list-item";
import Section from "@/shared/components/section";
import { ListItemSkeleton } from "@/shared/components/skeleton";
import { CertificationAtom } from "../(atoms)/usePortfolioStore";

export const CertificatesSection = ({ index }: { index?: number }) => {
  const { isLoading } = useCertificates();
  const certificates = useAtomValue(CertificationAtom);

  if (isLoading) {
    return (
      <Section title="Certificates" index={index}>
        <ul className="flex flex-col">
          {Array.from({ length: 5 }).map((_, i) => (
            <ListItemSkeleton key={i} />
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section title="Certificates" index={index} count={certificates.length}>
      <ul className="flex flex-col">
        {certificates.map((certificate, i) => (
          <ListItem
            key={i}
            title={certificate.name}
            meta={`${certificate.institution} · ${certificate.kind}`}
            badge={certificate.date}
          />
        ))}
      </ul>
    </Section>
  );
};
