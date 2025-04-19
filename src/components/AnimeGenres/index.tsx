import { Anime } from "@/types/anime";

type Props = {
  genres: Anime["genres"];
  "data-testid-prefix"?: string;
};

export const AnimeGenres = ({
  genres,
  "data-testid-prefix": dataTestIdPrefix = "",
}: Props) => {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {genres.map((genre, index) => (
        <span
          key={genre.mal_id}
          className="bg-ntrl-400 text-ntrl-100 px-4 py-2 rounded-full text-sm"
          data-testid={`${dataTestIdPrefix}txt_genre-${index + 1}`}
        >
          {genre.name}
        </span>
      ))}
    </div>
  );
};
