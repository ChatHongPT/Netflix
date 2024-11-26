import axios from 'axios';

const TMDB_API_KEY = '517ff51627420bdc50a849194a4ecee2';
const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'ko-KR',
  },
});

export const validateCredentials = async (password: string) => {
  return password === TMDB_API_KEY;
};
