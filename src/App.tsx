import { lazy, ReactNode, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Loading } from "./components/Loading";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AnimeList = lazy(() => import("./pages/anime-list"));
const AnimeDetail = lazy(() => import("./pages/anime-detail"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspensed>
                <AnimeList />
              </Suspensed>
            }
          />
          <Route
            path="/anime/:id"
            element={
              <Suspensed>
                <AnimeDetail />
              </Suspensed>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

const Suspensed = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center">
          <Loading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default App;
