import { useQuery } from "@tanstack/react-query";
import { searchAnime } from "../services/api";

export const useGetSearchSuggestions = (query: string) => {
  const queryKey = ["recommendation", query];
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => searchAnime({ pageParam: 1, limit: 5, queryKey }),
    enabled: !!query,
  });

  return { data: data?.data ?? [], isLoading };
};
