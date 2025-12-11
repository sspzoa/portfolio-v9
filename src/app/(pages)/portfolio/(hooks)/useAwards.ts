import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Award } from "@/shared/types";
import { AwardAtom } from "../(atoms)/usePortfolioStore";

export const useAwards = () => {
  const setAwards = useSetAtom(AwardAtom);

  return useQuery<Award[]>({
    queryKey: ["portfolio", "awards"],
    queryFn: async () => {
      const response = await fetch("/api/awards");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setAwards(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
