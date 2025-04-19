import { useInfiniteQuery } from "@tanstack/react-query";
import { searchAnime } from "../services/api";

export const useInfiniteAnimes = (query: string) => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["animes", query],
      queryFn: searchAnime,
      getNextPageParam: (lastPage) =>
        lastPage.pagination.has_next_page
          ? lastPage.pagination.current_page + 1
          : undefined,
      initialPageParam: 1,
    });

  return {
    data: data?.pages.flatMap((page) => page.data) ?? [],
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
