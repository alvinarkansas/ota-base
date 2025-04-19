type Props = {
  "data-testid-prefix"?: string;
};

export const AnimeListPlaceholder = ({
  "data-testid-prefix": dataTestIdPrefix = "",
}: Props) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-8">
      {[...Array(15)].map((_, index) => {
        return (
          <div
            key={index}
            className="rounded-lg h-40 sm:h-[360px] w-full bg-ntrl-400 animate-pulse"
            data-testid={`${dataTestIdPrefix}placeholder-${index + 1}`}
          />
        );
      })}
    </div>
  );
};
