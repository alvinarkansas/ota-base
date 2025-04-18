import axios from "axios";
import { AnimeResponse } from "../types/anime";

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  headers: {
    "Content-Type": "application/json",
  },
});

export const searchAnime = async (
  query: string = "",
  page: number = 1
): Promise<AnimeResponse> => {
  const response = await api.get("/anime", {
    params: {
      q: query,
      page,
      limit: 12,
    },
  });
  return response.data;
};
