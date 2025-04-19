import { render, screen } from "@/utils/testUtil";
import { AnimeStatus } from "./index";

describe(AnimeStatus.name, () => {
  it("displays episodes and status", () => {
    render(<AnimeStatus episodes={999} status="Foo" />);
    expect(screen.getByTestId("txt_episodes")).toBeVisible();
    expect(screen.getByTestId("txt_episodes")).toHaveTextContent(
      "999 Episodes"
    );
    expect(screen.getByTestId("txt_status")).toHaveTextContent("Foo");
  });

  it("only displays status when episodes is not provided", () => {
    render(<AnimeStatus episodes={null} status="Foo" />);
    expect(screen.queryByTestId("txt_episodes")).not.toBeInTheDocument();
    expect(screen.getByTestId("txt_status")).toHaveTextContent("Foo");
  });
});
