import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { getAnimeById } from "../services/api";
import { Anime, AnimeResponse } from "../types/anime";

export const AnimeDetail = () => {
  const { state } = useLocation();

  const { id } = useParams<{ id: string }>();
  const { data: animeResponse, isLoading } = useQuery<AnimeResponse>({
    queryKey: ["anime", id],
    queryFn: () => getAnimeById(Number(id)),
    enabled: !state,
  });

  const anime = (state?.detail as Anime) ?? animeResponse?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!anime) {
    return null;
  }

  return (
    <div className="container mx-auto md:px-4 relative">
      <div className="md:flex">
        <div className="relative md:w-1/3">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover"
          />
          <div className="bg-gradient-to-t from-ntrl-500 h-1/3 w-full absolute inset-x-0 bottom-0 -mb-1 md:hidden" />

          <Link
            to="/"
            className="inline-flex items-center text-ntrl-100 hover:text-ntrl-100 mb-6 absolute top-4 left-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Link>
        </div>

        <div className="p-6 md:w-2/3">
          <div className="flex items-center gap-1 rounded-full">
            <Star color="#FEE81E" size={16} strokeWidth={3} />
            <span className="text-sm font-semibold text-[#FEE81E]">
              {anime.score}
            </span>
          </div>

          <h1 className="text-xl font-bold mb-4">{anime.title}</h1>

          <div className="flex flex-wrap gap-2 mb-2">
            {anime.genres.map((genre) => (
              <span
                key={genre.mal_id}
                className="bg-ntrl-400 text-ntrl-100 px-4 py-2 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-xs mb-4">
            {anime.episodes} Episodes | {anime.status}
          </p>

          <p className="leading-relaxed text-ntrl-300 text-xs">
            {anime.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
};
