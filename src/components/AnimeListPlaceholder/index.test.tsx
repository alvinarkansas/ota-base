import { render, screen } from "@/utils/testUtil";
import { AnimeListPlaceholder } from ".";

describe(AnimeListPlaceholder.name, () => {
  test("renders placeholder items", () => {
    render(<AnimeListPlaceholder />);

    const items = screen.getAllByTestId(/placeholder-\d+/);
    expect(items).toHaveLength(15);
  });
});
