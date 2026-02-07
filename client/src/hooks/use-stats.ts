import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useStats() {
  return useQuery({
    queryKey: [api.stats.list.path],
    queryFn: async () => {
      const res = await fetch(api.stats.list.path);
      if (!res.ok) throw new Error("Failed to fetch studio stats");
      return api.stats.list.responses[200].parse(await res.json());
    },
  });
}
