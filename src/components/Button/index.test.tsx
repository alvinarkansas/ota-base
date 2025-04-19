import { render, screen } from "@/utils/testUtil";
import { Button } from "./index";
import userEvent from "@testing-library/user-event";

describe(Button.name, () => {
  it("renders button with children", () => {
    render(<Button>Foo</Button>);

    const button = screen.getByRole("button", { name: /foo/i });
    expect(button).toBeInTheDocument();
  });

  it("renders disabled state correctly", () => {
    const mockOnClick = vi.fn();
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    userEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
