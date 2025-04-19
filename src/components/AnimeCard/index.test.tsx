import { render, screen } from "@/utils/testUtil";
import { describe, it, expect } from "vitest";
import { AnimeCard } from ".";
import { MOCK_ANIME } from "../../__test__/constant";

describe(AnimeCard.name, () => {
  it("renders image of the anime", () => {
    render(<AnimeCard anime={MOCK_ANIME} />);

    const image = screen.getByAltText("Hunter x Hunter (2011)");
    expect(image).toBeVisible();
  });

  it("correctly navigates to the anime's details page", () => {
    render(<AnimeCard anime={MOCK_ANIME} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/anime/999");
  });
});
