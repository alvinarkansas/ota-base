import { render, screen } from "../utils/testUtil";
import { describe, it, expect } from "vitest";
import { Loading } from "./Loading";

describe(Loading.name, () => {
  it("renders the loading spinner and text", () => {
    render(<Loading />);
    const text = screen.getByText(/loading/i);

    expect(text).toBeInTheDocument();
  });
});
