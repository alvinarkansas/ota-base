import { lazy, ReactNode, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoadingScreen from "./pages/LoadingScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimeList = lazy(() => import("./pages/AnimeList"));
const AnimeDetail = lazy(() => import("./pages/AnimeDetail"));

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
    </QueryClientProvider>
  );
}

const Suspensed = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>;
};

export default App;
