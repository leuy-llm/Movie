export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: string[];
  runtime?: number;
  director?: string;
  cast?: string[];
  trailer_url?: string;
}

export interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  genres: string[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  created_by?: string[];
  cast?: string[];
  trailer_url?: string;
}

export interface Genre {
  id: number;
  name: string;
}