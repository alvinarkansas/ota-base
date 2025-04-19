/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter } from "react-router-dom";
import { render, type RenderOptions } from "@testing-library/react";

const customRender = (
  ui: React.ReactElement,
  _?: undefined,
  __?: undefined,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: ({ children }) => {
      return <BrowserRouter>{children}</BrowserRouter>;
    },
    ...options,
  });
};

export * from "@testing-library/react";

export { customRender as render };
