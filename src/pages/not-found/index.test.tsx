import { customRender, screen } from "@/utils/testUtil";
import NotFound from ".";

describe(NotFound.name, () => {
  it("displays the correct message", () => {
    customRender(<NotFound />);

    expect(screen.getByText("Sorry")).toBeVisible();
    expect(screen.getByText("We can't seem to find this page")).toBeVisible();
  });

  it("renders a button with the correct text", () => {
    customRender(<NotFound />);

    const button = screen.getByText("Take me back, senpai");
    expect(button).toBeVisible();
  });

  it("contains a link to the homepage", () => {
    customRender(<NotFound />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
