import React from "react";
import { Button } from "../components/Button";
import { useSearchParams } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { AnimeCard } from "../components/AnimeCard";
import { useInfiniteAnimes } from "../hooks/useGetInfiniteAnimes";

export const AnimeList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteAnimes(searchQuery);

  const handleSearch = (newSearch: string) => {
    setSearchParams(newSearch ? { q: newSearch } : {});
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4 lg:flex lg:justify-between">
          <h1 className="text-3xl font-bold mb-6">Otabase</h1>
          <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-8">
              {data.map((anime) => {
                return <AnimeCard key={anime.mal_id} anime={anime} />;
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

            {!hasNextPage && data.length > 0 && (
              <div className="text-center text-ntrl-400">
                No more results to load
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
