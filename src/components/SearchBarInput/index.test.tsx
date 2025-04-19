import { render, screen } from "@/utils/testUtil";
import { SearchBarInput } from "./index";
import userEvent from "@testing-library/user-event";
import { Combobox } from "@headlessui/react";

const props = {
  query: "",
  onChange: vi.fn(),
  onClear: vi.fn(),
  onEnter: vi.fn(),
};

describe(SearchBarInput.name, () => {
  it("handles clear", async () => {
    const mockOnClear = vi.fn();
    render(
      <Combobox>
        <SearchBarInput {...props} query="query" onClear={mockOnClear} />
      </Combobox>
    );

    const button = screen.getByTestId("btn_clear");
    await userEvent.click(button);

    expect(mockOnClear).toHaveBeenCalled();
  });

  it("handles press enter key", async () => {
    const mockOnEnter = vi.fn();
    const mockOnChange = vi.fn();
    render(
      <Combobox>
        <SearchBarInput
          {...props}
          onEnter={mockOnEnter}
          onChange={mockOnChange}
        />
      </Combobox>
    );

    const input = screen.getByTestId("txtfld_search");

    await userEvent.click(input);
    await userEvent.type(input, "test");
    expect(mockOnChange).toHaveBeenCalled();

    await userEvent.keyboard("[Enter]");
    expect(mockOnEnter).toHaveBeenCalled();
  });
});
