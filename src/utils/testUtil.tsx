/* eslint-disable react-refresh/only-export-components */
import { BrowserRouter } from "react-router-dom";
import { render, type RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const customRender = (
  ui: React.ReactElement,
  _?: undefined,
  __?: undefined,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return render(ui, {
    wrapper: ({ children }) => {
      return (
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
        </QueryClientProvider>
      );
    },
    ...options,
  });
};

export * from "@testing-library/react";

export { customRender };
