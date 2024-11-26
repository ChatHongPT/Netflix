import { api } from './api';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string; // 선택적 속성으로 추가
  overview: string;
  vote_average: number;
  release_date: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  page: number;
}

export const getPopularMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/popular', {
    params: { page },
  });

export const getTopRatedMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/top_rated', {
    params: { page },
  });

export const getUpcomingMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/upcoming', {
    params: { page },
  });

export const getNowPlayingMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/now_playing', {
    params: { page },
  });
