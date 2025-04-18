import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimeList } from "./pages/AnimeList";
import { AnimeDetail } from "./pages/AnimeDetail";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimeList />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
