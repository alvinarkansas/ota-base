import { useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  src: string;
  alt: string;
  className?: string;
  "data-testid"?: string;
  "overlay-data-testid"?: string;
};

export const AnimeThumbnail = ({
  src,
  alt,
  className,
  "data-testid": dataTestId = "",
  "overlay-data-testid": overlayDataTestId = "",
}: Props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={twMerge(
        "relative rounded-lg h-40 sm:h-[360px] w-full overflow-hidden",
        className
      )}
    >
      <div
        className={`absolute inset-0 bg-ntrl-400 transition-opacity duration-300 ${
          imageLoaded ? "opacity-0" : "opacity-100 animate-pulse"
        }`}
        data-testid={overlayDataTestId}
      />
      <img
        src={src}
        alt={alt}
        className={`object-cover h-full w-full transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        data-testid={dataTestId}
      />
    </div>
  );
};
