import { api } from './api';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  genre_ids: number[];
}

export interface Genre {
  id: number;
  name: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  page: number;
}

export const getPopularMovies = (page = 10) =>
  api.get<MovieResponse>('/movie/popular', {
    params: { page },
  });

export const getTopRatedMovies = (page = 10) =>
  api.get<MovieResponse>('/movie/top_rated', {
    params: { page },
  });

export const getNowPlayingMovies = (page = 10) =>
  api.get<MovieResponse>('/movie/now_playing', {
    params: { page },
  });

export const getUpcomingMovies = (page = 10) =>
  api.get<MovieResponse>('/movie/upcoming', {
    params: { page },
  });

export const getMoviesByGenre = (genreId: number, page = 10) =>
  api.get<MovieResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
    },
  });

export const getGenres = () =>
  api.get<{ genres: Genre[] }>('/genre/movie/list');

export const searchMovies = (query: string, page = 32) =>
  api.get<MovieResponse>('/search/movie', {
    params: { query, page },
  });