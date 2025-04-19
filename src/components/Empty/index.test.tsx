import { render, screen } from "@/utils/testUtil";
import { Empty } from "./index";

describe(Empty.name, () => {
  it("renders correctly", () => {
    render(<Empty />);
    expect(screen.getByText("Sumimasen, we found nothing")).toBeVisible();
  });
});
