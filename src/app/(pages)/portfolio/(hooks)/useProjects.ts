import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import type { Project } from "@/shared/types";
import { ProjectAtom } from "../(atoms)/usePortfolioStore";

export const useProjects = () => {
  const setProjects = useSetAtom(ProjectAtom);

  return useQuery<Project[]>({
    queryKey: ["portfolio", "projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }

      return data;
    },
    select: (data) => {
      setProjects(data);
      return data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
