import { render, screen } from "@/utils/testUtil";
import { describe, it, expect } from "vitest";
import { AnimeCard } from "./index";
import { MOCK_ANIME } from "../../__test__/constant";
import { BrowserRouter } from "react-router-dom";

const props = {
  anime: MOCK_ANIME,
};

describe(AnimeCard.name, () => {
  it("correctly navigates to the anime's details page", () => {
    render(
      <BrowserRouter>
        <AnimeCard {...props} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/anime/999");
  });
});
