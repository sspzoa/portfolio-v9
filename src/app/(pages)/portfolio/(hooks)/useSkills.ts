import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Skill } from "@/shared/types";
import { SkillAtom } from "../(atoms)/usePortfolioStore";

export const useSkills = () => {
  const setSkills = useSetAtom(SkillAtom);

  return useQuery<Skill[]>({
    queryKey: ["portfolio", "skills"],
    queryFn: async () => {
      const response = await fetch("/api/skills");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setSkills(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
