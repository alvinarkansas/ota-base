import { useQuery } from "@tanstack/react-query";
import { AnimeDetailResponse } from "../types/anime";
import { getAnimeById } from "../services/api";

type Param = {
  id: string | undefined;
  enabled?: boolean;
};

export const useGetAnimeDetail = ({ id, enabled }: Param) => {
  const { data, isLoading } = useQuery<AnimeDetailResponse>({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(Number(id)),
    enabled,
  });

  return {
    data,
    isLoading,
  };
};
