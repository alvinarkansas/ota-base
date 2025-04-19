import { render, screen } from "@/utils/testUtil";
import { AnimeScore } from ".";

describe(AnimeScore.name, () => {
  it("renders score correctly", () => {
    render(<AnimeScore score={9.9} />);
    expect(screen.getByTestId("txt_score")).toHaveTextContent("9.9");
  });

  it("displays fallback value", () => {
    render(<AnimeScore score={null} />);
    expect(screen.getByTestId("txt_score")).toHaveTextContent("N/A");
  });
});
