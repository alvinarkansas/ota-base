type Props = {
  episodes: number | null;
  status: string;
  "data-testid-prefix"?: string;
};

export const AnimeStatus = ({
  episodes,
  status,
  "data-testid-prefix": dataTestIdPrefix = "",
}: Props) => {
  return (
    <div className="flex items-start gap-1">
      {episodes ? (
        <>
          <span
            className="text-xs mb-4"
            data-testid={`${dataTestIdPrefix}txt_episodes`}
          >
            {episodes} Episodes
          </span>
          <span className="text-xs">|</span>
        </>
      ) : null}

      <span
        className="text-xs mb-4"
        data-testid={`${dataTestIdPrefix}txt_status`}
      >
        {" "}
        {status}
      </span>
    </div>
  );
};
