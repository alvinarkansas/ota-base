import { useLocation, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AnimeGenres } from "@/components/AnimeGenres";
import { AnimeThumbnail } from "@/components/AnimeThumbnail";
import { AnimeScore } from "@/components/AnimeScore";
import { AnimeStatus } from "@/components/AnimeStatus";
import { Loading } from "@/components/Loading";
import { Empty } from "@/components/Empty";
import apologize from "@/assets/apologize.png";
import { useGetAnimeDetail } from "../hooks/useGetAnimeDetail";
import type { Anime } from "../types/anime";

const dataTestIdPrefix = "anime_detail_page-";

const AnimeDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const { data: animeResponse, isLoading } = useGetAnimeDetail({
    id,
    enabled: !state,
  });

  const anime = (state?.detail as Anime) ?? animeResponse?.data;

  const handleNavigation = () => {
    if (anime) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto md:py-8 relative">
      <div className="md:flex">
        <div className="relative md:w-1/3 md:flex md:flex-col-reverse md:gap-4">
          {!isLoading ? (
            <AnimeThumbnail
              src={anime ? anime.images.jpg.large_image_url : apologize}
              alt={anime ? anime.title : "Placeholder"}
              className="h-[70vh] sm:h-full rounded-none md:rounded-lg"
              data-testid={`${dataTestIdPrefix}img_thumbnail`}
            />
          ) : (
            <div className="h-[70vh] sm:h-full w-full" />
          )}
          <div className="bg-gradient-to-t from-ntrl-500 h-1/3 w-full absolute inset-x-0 bottom-0 -mb-1 md:hidden" />

          <button
            onClick={handleNavigation}
            className="inline-flex items-center text-ntrl-100 hover:text-ntrl-100 absolute top-4 left-4 md:relative md:mb-6"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
        </div>

        <div className="p-6 md:w-2/3 md:pt-16">
          {!isLoading ? (
            !anime ? (
              <Empty />
            ) : (
              <>
                <AnimeScore
                  score={anime.score}
                  data-testid-prefix={dataTestIdPrefix}
                />
                <h1 className="text-xl font-bold mb-4 lg:text-3xl">
                  {anime.title}
                </h1>
                <AnimeGenres
                  genres={anime.genres}
                  data-testid-prefix={dataTestIdPrefix}
                />
                <AnimeStatus
                  episodes={anime.episodes}
                  status={anime.status}
                  data-testid-prefix={dataTestIdPrefix}
                />
                <p className="leading-relaxed text-ntrl-300 text-xs lg:text-sm lg:leading-loose">
                  {anime.synopsis}
                </p>
              </>
            )
          ) : (
            <div className="h-32 w-full grid place-items-center md:justify-items-start md:h-auto">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
