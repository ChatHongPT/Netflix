import axios from 'axios'

const TMDB_API_KEY = '517ff51627420bdc50a849194a4ecee2'
const BASE_URL = 'https://api.themoviedb.org/3'

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY
  }
})

export const validateCredentials = async (email: string, password: string) => {
  // Check if password matches TMDB API key
  return password === TMDB_API_KEY
}