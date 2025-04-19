export type AnimeResponse = {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: Anime[];
};

export type AnimeDetailResponse = {
  data: Anime;
};

export type Anime = {
  mal_id: number;
  url: string;
  images: Images;
  trailer: Trailer;
  approved: boolean;
  titles: Title[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number | null;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number | null;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: Broadcast;
  producers: BaseDetailObject[];
  licensors: BaseDetailObject[];
  studios: BaseDetailObject[];
  genres: BaseDetailObject[];
  themes: BaseDetailObject[];
  demographics: BaseDetailObject[];
};

export type Images = {
  jpg: Jpg;
  webp: Webp;
};

export type Jpg = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

export type Webp = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

export type Trailer = {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: Images2;
};

export type Images2 = {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
};

export type Title = {
  type: string;
  title: string;
};

export type Aired = {
  from: string;
  to: string;
  prop: Prop;
  string: string;
};

export type Prop = {
  from: From;
  to: To;
};

export type From = {
  day: number;
  month: number;
  year: number;
};

export type To = {
  day: number;
  month: number;
  year: number;
};

export type Broadcast = {
  day: string;
  time: string;
  timezone: string;
  string: string;
};

type BaseDetailObject = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};
