import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Experience } from "@/shared/types";
import { ExperienceAtom } from "../(atoms)/usePortfolioStore";

export const useExperiences = () => {
  const setExperiences = useSetAtom(ExperienceAtom);

  return useQuery<Experience[]>({
    queryKey: ["portfolio", "experiences"],
    queryFn: async () => {
      const response = await fetch("/api/experiences");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setExperiences(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
