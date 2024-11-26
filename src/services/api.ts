import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
let TMDB_API_KEY = '';

export const api = axios.create({
  baseURL: BASE_URL,
});

// Update API key and axios instance params
export const updateApiKey = (password: string) => {
  TMDB_API_KEY = password;
  api.defaults.params = {
    api_key: TMDB_API_KEY,
    language: 'ko-KR',
  };
};

// Validate credentials by testing the API key
export const validateCredentials = async (password: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: password,
        language: 'ko-KR',
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};