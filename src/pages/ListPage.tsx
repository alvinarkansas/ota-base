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

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-3xl font-bold mb-6">Otabase</h1>
          <input
            placeholder="Search anime..."
            className="w-full px-6 py-4 rounded-full bg-neutral-400 placeholder:text-neutral-300"
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
            <div className="grid grid-cols-3 gap-2 mb-8">
              {data?.data.map((anime) => {
                return (
                  <div key={anime.mal_id} className="flex flex-col">
                    <img
                      src={anime.images.jpg.large_image_url}
                      alt={anime.title}
                      className="object-cover rounded-lg h-40 w-full"
                    />
                    <div className="p-2 hidden">
                      <h2 className="text-lg font-bold mb-2">{anime.title}</h2>
                      <p className="text-sm text-gray-500">
                        {anime.title_english}
                      </p>
                      <p className="text-sm text-gray-500">
                        {anime.title_japanese}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
