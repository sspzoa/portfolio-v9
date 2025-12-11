import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Education } from "@/shared/types";
import { EducationAtom } from "../(atoms)/usePortfolioStore";

export const useEducations = () => {
  const setEducations = useSetAtom(EducationAtom);

  return useQuery<Education[]>({
    queryKey: ["portfolio", "educations"],
    queryFn: async () => {
      const response = await fetch("/api/educations");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setEducations(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
