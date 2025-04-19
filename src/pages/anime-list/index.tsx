import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/Button";
import { SearchBar } from "@/components/SearchBar";
import { AnimeCard } from "@/components/AnimeCard";
import { Loading } from "@/components/Loading";
import { AnimeListPlaceholder } from "@/components/AnimeListPlaceholder";
import { Empty } from "@/components/Empty";
import { useInfiniteAnimes } from "../../hooks/useGetInfiniteAnimes";

const dataTestIdPrefix = "anime_list_page-";

const AnimeList = () => {
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
          <SearchBar
            onSearch={handleSearch}
            defaultValue={searchQuery}
            data-testid-prefix={`${dataTestIdPrefix}search_bar-`}
          />
        </div>

        {isLoading ? (
          <AnimeListPlaceholder data-testid-prefix={dataTestIdPrefix} />
        ) : data.length > 0 ? (
          <>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-8">
              {data.map((anime, index) => {
                return (
                  <AnimeCard
                    key={anime.mal_id}
                    anime={anime}
                    data-testid={`${dataTestIdPrefix}img_thumbnail-${
                      index + 1
                    }`}
                    overlay-data-testid={`${dataTestIdPrefix}img_overlay-${
                      index + 1
                    }`}
                  />
                );
              })}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mb-8">
                <Button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  data-testid={`${dataTestIdPrefix}btn_load_more`}
                >
                  {isFetchingNextPage ? <Loading /> : "Load More"}
                </Button>
              </div>
            )}

            {!hasNextPage && data.length > 0 && (
              <div className="text-center text-ntrl-400">
                No more results to load
              </div>
            )}
          </>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default AnimeList;
