import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Certification } from "@/shared/types";
import { CertificationAtom } from "../(atoms)/usePortfolioStore";

export const useCertificates = () => {
  const setCertificates = useSetAtom(CertificationAtom);

  return useQuery<Certification[]>({
    queryKey: ["portfolio", "certificates"],
    queryFn: async () => {
      const response = await fetch("/api/certificates");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setCertificates(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
