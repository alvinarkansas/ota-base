import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchAnime } from "../services/api";

export const ListPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["animes", search, page],
    queryFn: () => searchAnime(search, page),
  });

  console.log(">>", data);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-6">Otabase</h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {data?.data.map((anime) => (
                <div key={anime.mal_id}>
                  <pre>{JSON.stringify(anime, null, 2)}</pre>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
