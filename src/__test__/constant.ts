import { Anime } from "../types/anime";

export const MOCK_ANIME: Anime = {
  mal_id: 999,
  url: "https://example.com/999",
  images: {
    jpg: {
      image_url: "https://example.com/images.jpg",
      small_image_url: "https://example.com/images.jpg",
      large_image_url: "https://example.com/images.jpg",
    },
    webp: {
      image_url: "https://example.com/images.webp",
      small_image_url: "https://example.com/images.webp",
      large_image_url: "https://example.com/images.webp",
    },
  },
  trailer: {
    youtube_id: "youtube_id",
    url: "https://www.youtube.com/watch?v=youtube_id",
    embed_url: "https://www.youtube.com/embed/youtube_id",
    images: {
      image_url: "https://img.youtube.com/vi/youtube_id/default.jpg",
      small_image_url: "https://img.youtube.com/vi/youtube_id/sddefault.jpg",
      medium_image_url: "https://img.youtube.com/vi/youtube_id/mqdefault.jpg",
      large_image_url: "https://img.youtube.com/vi/youtube_id/hqdefault.jpg",
      maximum_image_url: "https://img.youtube.com/vi/youtube_id/maxdefault.jpg",
    },
  },
  approved: true,
  titles: [
    {
      type: "Default",
      title: "Default Title",
    },
    {
      type: "Synonym",
      title: "Synonym Title",
    },
    {
      type: "Japanese",
      title: "ティテル",
    },
    {
      type: "English",
      title: "English Title",
    },
  ],
  title: "Title",
  title_english: "English Title",
  title_japanese: "ティテル",
  title_synonyms: ["Synonym Title"],
  type: "TV",
  source: "Manga",
  episodes: 148,
  status: "Finished Airing",
  airing: false,
  aired: {
    from: "2011-10-02T00:00:00+00:00",
    to: "2014-09-24T00:00:00+00:00",
    prop: {
      from: {
        day: 2,
        month: 10,
        year: 2011,
      },
      to: {
        day: 24,
        month: 9,
        year: 2014,
      },
    },
    string: "Oct 2, 2011 to Sep 24, 2014",
  },
  duration: "23 min per ep",
  rating: "PG-13 - Teens 13 or older",
  score: 9.03,
  scored_by: 1853573,
  rank: 8,
  popularity: 8,
  members: 2983676,
  favorites: 218595,
  synopsis:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  background: "",
  season: "fall",
  year: 2011,
  broadcast: {
    day: "Sundays",
    time: "10:55",
    timezone: "Asia/Tokyo",
    string: "Sundays at 10:55 (JST)",
  },
  producers: [
    {
      mal_id: 29,
      type: "anime",
      name: "VAP",
      url: "https://myanimelist.net/anime/producer/29/VAP",
    },
    {
      mal_id: 1003,
      type: "anime",
      name: "Nippon Television Network",
      url: "https://myanimelist.net/anime/producer/1003/Nippon_Television_Network",
    },
    {
      mal_id: 1365,
      type: "anime",
      name: "Shueisha",
      url: "https://myanimelist.net/anime/producer/1365/Shueisha",
    },
  ],
  licensors: [
    {
      mal_id: 119,
      type: "anime",
      name: "VIZ Media",
      url: "https://myanimelist.net/anime/producer/119/VIZ_Media",
    },
  ],
  studios: [
    {
      mal_id: 11,
      type: "anime",
      name: "Madhouse",
      url: "https://myanimelist.net/anime/producer/11/Madhouse",
    },
  ],
  genres: [
    {
      mal_id: 1,
      type: "anime",
      name: "Action",
      url: "https://myanimelist.net/anime/genre/1/Action",
    },
    {
      mal_id: 2,
      type: "anime",
      name: "Adventure",
      url: "https://myanimelist.net/anime/genre/2/Adventure",
    },
    {
      mal_id: 10,
      type: "anime",
      name: "Fantasy",
      url: "https://myanimelist.net/anime/genre/10/Fantasy",
    },
  ],
  themes: [],
  demographics: [
    {
      mal_id: 27,
      type: "anime",
      name: "Shounen",
      url: "https://myanimelist.net/anime/genre/27/Shounen",
    },
  ],
};
