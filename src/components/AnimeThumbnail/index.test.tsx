import { fireEvent, render, screen } from "@/utils/testUtil";
import { AnimeThumbnail } from "./index";
import { MOCK_ANIME } from "../../__test__/constant";

const dataTestId = "img_thumbnail";
const overlayDataTestId = "img_overlay";

const props = {
  src: MOCK_ANIME.images.jpg.large_image_url,
  alt: MOCK_ANIME.title,
  "data-testid": dataTestId,
  "overlay-data-testid": overlayDataTestId,
};

const imageDefaultClass =
  "object-cover h-full w-full transition-opacity duration-300";
const overlayDefaultClass =
  "absolute inset-0 bg-ntrl-400 transition-opacity duration-300";

describe(AnimeThumbnail.name, () => {
  it("renders image of the anime", () => {
    render(<AnimeThumbnail {...props} />);

    const image = screen.getByAltText("Title");
    const overlay = screen.getByTestId(overlayDataTestId);
    expect(image).toBeVisible();
    expect(image).toHaveClass(`${imageDefaultClass} opacity-0`);
    expect(overlay).toHaveClass(
      `${overlayDefaultClass} opacity-100 animate-pulse`
    );
  });

  it("renders placeholder overlay", () => {
    render(<AnimeThumbnail {...props} />);

    const image = screen.getByAltText("Title");
    const overlay = screen.getByTestId(overlayDataTestId);
    fireEvent.load(image);
    expect(image).toBeVisible();
    expect(image).toHaveClass(`${imageDefaultClass} opacity-100`);
    expect(overlay).toHaveClass(`${overlayDefaultClass} opacity-0`);
  });
});
