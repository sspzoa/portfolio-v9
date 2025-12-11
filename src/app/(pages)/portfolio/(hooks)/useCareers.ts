import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Career } from "@/shared/types";
import { CareerAtom } from "../(atoms)/usePortfolioStore";

export const useCareers = () => {
  const setCareers = useSetAtom(CareerAtom);

  return useQuery<Career[]>({
    queryKey: ["portfolio", "careers"],
    queryFn: async () => {
      const response = await fetch("/api/careers");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setCareers(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
