import * as vitest from "vitest";
import { useSearchParams } from "react-router-dom";
import * as hooks from "@/hooks/useGetInfiniteAnimes";
import { customRender, screen } from "@/utils/testUtil";
import { MOCK_ANIME } from "@/__test__/constant";
import userEvent from "@testing-library/user-event";
import AnimeList from ".";

const prefix = "anime_list_page-";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe(AnimeList.name, () => {
  beforeEach(() => {
    (useSearchParams as vitest.Mock).mockReturnValue([
      new URLSearchParams({ q: "" }),
      vi.fn(),
    ]);
  });

  it("should display search bar", () => {
    customRender(<AnimeList />);
    const searchInput = screen.getByTestId(`${prefix}search_bar-txtfld_search`);
    expect(searchInput).toBeVisible();
  });

  it("should display loading state initially", () => {
    vi.spyOn(hooks, "useInfiniteAnimes").mockImplementation(() => {
      return {
        data: [],
        isLoading: true,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: vi.fn(),
      };
    });

    customRender(<AnimeList />);

    expect(screen.getByTestId(`${prefix}placeholder-1`)).toBeVisible();
    expect(screen.getByTestId(`${prefix}placeholder-2`)).toBeVisible();
    expect(screen.getByTestId(`${prefix}placeholder-3`)).toBeVisible();
  });

  it("should fetch more data when 'Load More' button is clicked", async () => {
    const mockFetchNextPage = vi.fn();
    vi.spyOn(hooks, "useInfiniteAnimes").mockImplementation(() => {
      return {
        data: [MOCK_ANIME],
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: true,
        fetchNextPage: mockFetchNextPage,
      };
    });

    customRender(<AnimeList />);

    const button = screen.getByTestId(`${prefix}btn_load_more`);
    await userEvent.click(button);

    expect(mockFetchNextPage).toHaveBeenCalled();
  });

  it("should display 'No more results to load' when hasNextPage is false", () => {
    vi.spyOn(hooks, "useInfiniteAnimes").mockImplementation(() => {
      return {
        data: [MOCK_ANIME],
        isLoading: false,
        isFetchingNextPage: false,
        hasNextPage: false,
        fetchNextPage: vi.fn(),
      };
    });

    customRender(<AnimeList />);

    expect(screen.getByText("No more results to load")).toBeVisible();
  });
});
