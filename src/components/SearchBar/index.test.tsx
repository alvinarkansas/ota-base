import { render, screen } from "@/utils/testUtil";
import { SearchBar } from "./index";
import * as hooks from "@/hooks/useGetSearchSuggestions";
import userEvent from "@testing-library/user-event";
import { MOCK_ANIME } from "@/__test__/constant";
import { Anime } from "@/types/anime";

const props = {
  onSearch: vi.fn(),
};

const MOCK_SUGGESTIONS: Anime[] = [
  { ...MOCK_ANIME, mal_id: 111, title: "Title 1" },
  { ...MOCK_ANIME, mal_id: 222, title: "Title 2" },
];

vi.mock("use-debounce", () => ({
  useDebounce: vi.fn((value) => {
    return [value];
  }),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import("react-router-dom")>()),
    useNavigate: () => {
      return mockNavigate;
    },
  };
});

describe(SearchBar.name, () => {
  it("displays loading when isLoading is true", async () => {
    vi.spyOn(hooks, "useGetSearchSuggestions").mockImplementation(() => {
      return {
        isLoading: true,
        data: [],
      };
    });

    render(<SearchBar {...props} />);
    const input = screen.getByTestId("txtfld_search");
    await userEvent.click(input);
    await userEvent.type(input, "test");

    expect(screen.getByTestId("txt_label")).toBeVisible();
    expect(screen.getByTestId("txt_label")).toHaveTextContent("Loading...");
  });

  it("displays suggestions when isLoading is false", async () => {
    vi.spyOn(hooks, "useGetSearchSuggestions").mockImplementation(() => {
      return {
        isLoading: false,
        data: MOCK_SUGGESTIONS,
      };
    });

    render(<SearchBar {...props} />);
    const input = screen.getByTestId("txtfld_search");
    await userEvent.click(input);
    await userEvent.type(input, "test");

    expect(screen.getByTestId("txt_query_label")).toBeVisible();
    expect(screen.getByTestId("img_query_icon")).toBeVisible();

    expect(screen.getByTestId("txt_label-1")).toBeVisible();
    expect(screen.getByTestId("img_icon-1")).toBeVisible();
    expect(screen.getByTestId("txt_label-2")).toBeVisible();
    expect(screen.getByTestId("img_icon-2")).toBeVisible();
    expect(screen.getByTestId("txt_label-1")).toHaveTextContent("Title 1");
    expect(screen.getByTestId("txt_label-2")).toHaveTextContent("Title 2");
  });

  it("handles clear correctly", async () => {
    const mockOnSearch = vi.fn();
    vi.spyOn(hooks, "useGetSearchSuggestions").mockImplementation(() => {
      return {
        isLoading: false,
        data: MOCK_SUGGESTIONS,
      };
    });

    render(<SearchBar {...props} onSearch={mockOnSearch} />);
    const input = screen.getByTestId("txtfld_search");
    await userEvent.click(input);
    await userEvent.type(input, "test");

    expect(input).toHaveValue("test");

    await userEvent.click(screen.getByTestId("btn_clear"));
    expect(input).toHaveValue("");
    expect(mockOnSearch).toHaveBeenCalledWith("");
  });

  it("handles user direct search (not from suggestion) correctly", async () => {
    const mockOnSearch = vi.fn();
    vi.spyOn(hooks, "useGetSearchSuggestions").mockImplementation(() => {
      return {
        isLoading: false,
        data: MOCK_SUGGESTIONS,
      };
    });

    render(<SearchBar {...props} onSearch={mockOnSearch} />);
    const input = screen.getByTestId("txtfld_search");
    await userEvent.click(input);
    await userEvent.type(input, "test");

    const searchOption = screen.getByTestId("txt_query_label");
    expect(searchOption).toBeVisible();
    await userEvent.click(searchOption);
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  it("navigates to detail page on suggestion click", async () => {
    vi.spyOn(hooks, "useGetSearchSuggestions").mockImplementation(() => {
      return {
        isLoading: false,
        data: MOCK_SUGGESTIONS,
      };
    });

    render(<SearchBar {...props} />);
    const input = screen.getByTestId("txtfld_search");
    await userEvent.click(input);
    await userEvent.type(input, "test");

    const suggestion = screen.getByTestId("txt_label-1");
    expect(suggestion).toBeVisible();
    await userEvent.click(suggestion);
    expect(mockNavigate).toHaveBeenCalledWith("/anime/111");
  });
});
