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

export const getPopularMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/popular', {
    params: { page },
  });

export const getTopRatedMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/top_rated', {
    params: { page },
  });

export const getNowPlayingMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/now_playing', {
    params: { page },
  });

export const getUpcomingMovies = (page = 1) =>
  api.get<MovieResponse>('/movie/upcoming', {
    params: { page },
  });

export const getMoviesByGenre = (genreId: number, page = 1) =>
  api.get<MovieResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc',
    },
  });

export const getMoviesByFilters = ({
  genreId,
  minRating,
  year,
  sortBy,
  page = 1,
}: {
  genreId?: number;
  minRating?: number;
  year?: string;
  sortBy?: string;
  page?: number;
}) =>
  api.get<MovieResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
      'vote_average.gte': minRating,
      primary_release_year: year,
      sort_by: sortBy || 'popularity.desc',
      page,
      region: 'KR',
    },
  });

export const getGenres = () =>
  api.get<{ genres: Genre[] }>('/genre/movie/list');

export const searchMovies = (query: string, page = 1) =>
  api.get<MovieResponse>('/search/movie', {
    params: { 
      query,
      page,
      region: 'KR',
      include_adult: false,
    },
  });