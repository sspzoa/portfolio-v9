import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { AboutMe } from "@/shared/types";
import { AboutMeAtom } from "../(atoms)/usePortfolioStore";

export const useAboutMe = () => {
  const setAboutMe = useSetAtom(AboutMeAtom);

  return useQuery<AboutMe>({
    queryKey: ["portfolio", "aboutme"],
    queryFn: async () => {
      const response = await fetch("/api/aboutme");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setAboutMe(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
