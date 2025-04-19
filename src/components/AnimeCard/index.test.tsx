import { customRender, screen } from "@/utils/testUtil";
import { describe, it, expect } from "vitest";
import { AnimeCard } from "./index";
import { MOCK_ANIME } from "../../__test__/constant";

const props = {
  anime: MOCK_ANIME,
};

describe(AnimeCard.name, () => {
  it("correctly navigates to the anime's details page", () => {
    customRender(<AnimeCard {...props} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/anime/999");
  });
});
