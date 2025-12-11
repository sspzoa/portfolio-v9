import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Activity } from "@/shared/types";
import { ActivityAtom } from "../(atoms)/usePortfolioStore";

export const useActivities = () => {
  const setActivities = useSetAtom(ActivityAtom);

  return useQuery<Activity[]>({
    queryKey: ["portfolio", "activities"],
    queryFn: async () => {
      const response = await fetch("/api/activities");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setActivities(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
