import { render, screen } from "@/utils/testUtil";
import { MOCK_ANIME } from "@/__test__/constant";
import { AnimeGenres } from "./index";

describe(AnimeGenres.name, () => {
  it("displays genres correctly", () => {
    render(<AnimeGenres genres={MOCK_ANIME.genres} />);
    expect(screen.getByTestId("txt_genre-1")).toBeVisible();
    expect(screen.getByTestId("txt_genre-2")).toBeVisible();
    expect(screen.getByTestId("txt_genre-3")).toBeVisible();
  });
});
