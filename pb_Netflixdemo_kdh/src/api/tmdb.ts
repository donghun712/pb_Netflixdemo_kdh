import axiosClient from "./axiosClient";

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    vote_average: number;
    release_date: string;
    genre_ids?: number[];
    popularity?: number;
}

export interface TMDBResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

/* ✅ 여기부터 추가 */
export interface Genre {
    id: number;
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
}

export const getGenres = () =>
    axiosClient.get<GenreResponse>("/genre/movie/list");

export const searchMovies = (params: { query: string; page?: number }) => {
  const { query, page } = params;

  return axiosClient.get<TMDBResponse<Movie>>("/search/movie", {
    params: {
      query,
      page: page ?? 1,
      include_adult: false,
    },
  });
};


export const getNowPlaying = (page = 1) =>
    axiosClient.get<TMDBResponse<Movie>>("/movie/now_playing", {
        params: { page },
    });

export const getPopular = (page = 1) =>
    axiosClient.get<TMDBResponse<Movie>>("/movie/popular", {
        params: { page },
    });

export const getTopRated = (page = 1) =>
    axiosClient.get<TMDBResponse<Movie>>("/movie/top_rated", {
        params: { page },
    });

export const getUpcoming = (page = 1) =>
    axiosClient.get<TMDBResponse<Movie>>("/movie/upcoming", {
        params: { page },
    });
