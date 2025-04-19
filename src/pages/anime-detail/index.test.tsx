import * as vitest from "vitest";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as hooks from "@/hooks/useGetAnimeDetail";
import { customRender, screen } from "@/utils/testUtil";
import { MOCK_ANIME } from "@/__test__/constant";
import userEvent from "@testing-library/user-event";
import AnimeDetail from ".";

const prefix = "anime_detail_page-";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe(AnimeDetail.name, () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as vitest.Mock).mockReturnValue(mockNavigate);
  });

  it("should prioritize data from react-router-dom's state", () => {
    (useLocation as vitest.Mock).mockReturnValue({
      state: { detail: MOCK_ANIME },
    });
    (useParams as vitest.Mock).mockReturnValue({ id: "1" });
    vi.spyOn(hooks, "useGetAnimeDetail").mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
      };
    });

    customRender(<AnimeDetail />);

    expect(screen.getByText(MOCK_ANIME.title)).toBeVisible();
    expect(screen.getByText(MOCK_ANIME.synopsis)).toBeVisible();
  });

  it("should use data from API response if no state is provided", () => {
    (useLocation as vitest.Mock).mockReturnValue({ state: null });
    (useParams as vitest.Mock).mockReturnValue({ id: "1" });
    vi.spyOn(hooks, "useGetAnimeDetail").mockImplementation(() => {
      return {
        data: {
          data: MOCK_ANIME,
        },
        isLoading: false,
      };
    });

    customRender(<AnimeDetail />);

    expect(screen.getByText(MOCK_ANIME.title)).toBeVisible();
    expect(screen.getByText(MOCK_ANIME.synopsis)).toBeVisible();
  });

  it("should handle navigation on back button click when anime is available", async () => {
    (useLocation as vitest.Mock).mockReturnValue({
      state: { detail: MOCK_ANIME },
    });
    (useParams as vitest.Mock).mockReturnValue({ id: "1" });
    vi.spyOn(hooks, "useGetAnimeDetail").mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
      };
    });

    customRender(<AnimeDetail />);

    const backButton = screen.getByText("Back");
    await userEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("should navigate to homepage when anime is not available", async () => {
    (useLocation as vitest.Mock).mockReturnValue({ state: null });
    (useParams as vitest.Mock).mockReturnValue({ id: "1" });
    vi.spyOn(hooks, "useGetAnimeDetail").mockImplementation(() => {
      return {
        data: undefined,
        isLoading: false,
      };
    });

    customRender(<AnimeDetail />);

    const backButton = screen.getByText("Back");
    await userEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles loading state", () => {
    (useLocation as vitest.Mock).mockReturnValue({ state: null });
    (useParams as vitest.Mock).mockReturnValue({ id: "1" });
    vi.spyOn(hooks, "useGetAnimeDetail").mockImplementation(() => {
      return {
        data: undefined,
        isLoading: true,
      };
    });

    customRender(<AnimeDetail />);

    expect(
      screen.queryByTestId(`${prefix}img_thumbnail`)
    ).not.toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeVisible();
  });
});
