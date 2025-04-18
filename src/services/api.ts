import axios from "axios";
import { AnimeResponse } from "../types/anime";

const api = axios.create({
  baseURL: "https://api.jikan.moe/v4",
  headers: {
    "Content-Type": "application/json",
  },
});

type SearchAnimeParams = {
  pageParam: number;
  queryKey: string[];
};

export const searchAnime = async ({
  pageParam = 1,
  queryKey,
}: SearchAnimeParams): Promise<AnimeResponse> => {
  const [_, query] = queryKey;
  console.log();
  const response = await api.get("/anime", {
    params: {
      q: query,
      page: pageParam,
      limit: 15,
      sfw: true,
    },
  });
  return response.data;
};

export const getAnimeById = async (id: number) => {
  const response = await api.get(`/anime/${id}`);
  return response.data;
};
