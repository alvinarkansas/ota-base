import { Star } from "lucide-react";

type Props = {
  score: number | null;
  "data-testid-prefix"?: string;
};

export const AnimeScore = ({
  score,
  "data-testid-prefix": dataTestIdPrefix = "",
}: Props) => {
  return (
    <div className="flex items-center gap-1 rounded-full md:mb-2">
      <Star color="#FEE81E" size={16} strokeWidth={3} />
      <span
        className="text-sm font-semibold text-[#FEE81E]"
        data-testid={`${dataTestIdPrefix}txt_score`}
      >
        {score ?? "N/A"}
      </span>
    </div>
  );
};
