import { render, screen } from "@/utils/testUtil";
import userEvent from "@testing-library/user-event";
import { Combobox } from "@headlessui/react";
import { SearchBarSuggestion } from "./index";

const props = {
  label: "label",
  value: null,
  icon: <span>Icon</span>,
  onClick: vi.fn(),
  "label-data-testid": "label-testid",
  "icon-data-testid": "icon-testid",
};

describe(SearchBarSuggestion.name, () => {
  it("renders correct information", () => {
    render(
      <Combobox>
        <SearchBarSuggestion {...props} />
      </Combobox>
    );

    expect(screen.getByTestId("label-testid")).toBeVisible();
    expect(screen.getByText("Icon")).toBeVisible();
  });

  it("does not render icon", () => {
    render(
      <Combobox>
        <SearchBarSuggestion {...props} icon={null} />
      </Combobox>
    );

    expect(screen.queryByTestId("icon-testid")).not.toBeInTheDocument();
  });

  it("handles click correctly", async () => {
    const mockOnClick = vi.fn();

    render(
      <Combobox>
        <SearchBarSuggestion {...props} onClick={mockOnClick} />
      </Combobox>
    );

    await userEvent.click(screen.getByTestId("label-testid"));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
