import axios from "axios";
import { AnimeResponse } from "../types/anime";
import { JIKAN_MOE_URL } from "../env";

const api = axios.create({
  baseURL: JIKAN_MOE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

type SearchAnimeParams = {
  pageParam: number;
  limit?: number;
  queryKey: string[];
};

export const searchAnime = async ({
  pageParam = 1,
  limit = 15,
  queryKey,
}: SearchAnimeParams): Promise<AnimeResponse> => {
  const [_, query] = queryKey;
  const response = await api.get("/anime", {
    params: {
      q: query,
      page: pageParam,
      limit,
      sfw: true,
      order_by: "score",
      sort: "desc",
    },
  });
  return response.data;
};

export const getRecommendation = async (q: string): Promise<AnimeResponse> => {
  const response = await api.get("/anime", {
    params: {
      q,
      page: 1,
      limit: 5,
      sfw: true,
    },
  });
  return response.data;
};

export const getAnimeById = async (id: number) => {
  const response = await api.get(`/anime/${id}`);
  return response.data;
};
