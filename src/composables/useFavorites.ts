import { ref, onMounted } from 'vue';
import type { Movie } from '../services/movieApi';

const STORAGE_KEY = 'favorite-movies';
const favoriteMovies = ref<Movie[]>([]);

export function useFavorites() {
  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      favoriteMovies.value = JSON.parse(stored);
    }
  });

  const toggleFavorite = (movie: Movie) => {
    const index = favoriteMovies.value.findIndex(m => m.id === movie.id);
    
    if (index === -1) {
      favoriteMovies.value.push(movie);
    } else {
      favoriteMovies.value.splice(index, 1);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteMovies.value));
  };

  const isFavorite = (movieId: number): boolean => {
    return favoriteMovies.value.some(movie => movie.id === movieId);
  };

  return {
    favoriteMovies,
    toggleFavorite,
    isFavorite
  };
}