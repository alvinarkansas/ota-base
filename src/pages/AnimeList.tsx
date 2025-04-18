import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchAnime } from "../services/api";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export const AnimeList: React.FC = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["animes", search],
      queryFn: searchAnime,
      getNextPageParam: (lastPage) =>
        lastPage.pagination.has_next_page
          ? lastPage.pagination.current_page + 1
          : undefined,
      initialPageParam: 1,
    });

  const animeList = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-6">Otabase</h1>
          <input
            placeholder="Search anime..."
            className="w-full px-6 py-4 rounded-full bg-ntrl-400 placeholder:text-ntrl-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-8">
              {animeList.map((anime) => {
                return (
                  <Link
                    to={`anime/${anime.mal_id}`}
                    state={{ detail: anime }}
                    key={anime.mal_id}
                    className="flex flex-col lg:transition lg:hover:scale-95"
                  >
                    <img
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      className="object-cover rounded-lg h-40 sm:h-[360px] w-full"
                    />
                  </Link>
                );
              })}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mb-8">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "Load More"}
                </Button>
              </div>
            )}

            {!hasNextPage && animeList.length > 0 && (
              <div className="text-center text-gray-600">
                No more results to load
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
