import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { Anime } from "../types/anime";
import { useGetAnimeDetail } from "../hooks/useGetAnimeDetail";

export const AnimeDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { data: animeResponse, isLoading } = useGetAnimeDetail({
    id,
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
    <div className="container mx-auto md:py-8 relative">
      <div className="md:flex">
        <div className="relative md:w-1/3 md:flex md:flex-col-reverse md:gap-4">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="w-full h-full object-cover md:rounded-lg"
          />
          <div className="bg-gradient-to-t from-ntrl-500 h-1/3 w-full absolute inset-x-0 bottom-0 -mb-1 md:hidden" />

          <button
            onClick={() => {
              navigate(-1);
            }}
            className="inline-flex items-center text-ntrl-100 hover:text-ntrl-100 absolute top-4 left-4 md:relative md:mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>

        <div className="p-6 md:w-2/3 md:pt-16">
          <div className="flex items-center gap-1 rounded-full md:mb-2">
            <Star color="#FEE81E" size={16} strokeWidth={3} />
            <span className="text-sm font-semibold text-[#FEE81E]">
              {anime.score ?? "N/A"}
            </span>
          </div>

          <h1 className="text-xl font-bold mb-4 lg:text-3xl">{anime.title}</h1>

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

          <div className="flex items-start gap-1">
            {anime.episodes ? (
              <>
                <span className="text-xs mb-4">{anime.episodes} Episodes</span>
                <span className="text-xs">|</span>
              </>
            ) : null}

            <span className="text-xs mb-4"> {anime.status}</span>
          </div>

          <p className="leading-relaxed text-ntrl-300 text-xs lg:text-sm lg:leading-loose">
            {anime.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
};
