import { Link } from "react-router-dom";
import { Anime } from "../types/anime";
import { useState } from "react";

type Props = {
  anime: Anime;
};

export const AnimeCard = ({ anime }: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`anime/${anime.mal_id}`}
      state={{ detail: anime }}
      key={anime.mal_id}
      className="lg:transition lg:hover:scale-95"
    >
      <div className="relative rounded-lg h-40 sm:h-[360px] w-full overflow-hidden">
        <div
          className={`absolute inset-0 bg-ntrl-400 transition-opacity duration-300 ${
            imageLoaded ? "opacity-0" : "opacity-100 animate-pulse"
          }`}
        />
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className={`object-cover h-full w-full transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </div>
    </Link>
  );
};
