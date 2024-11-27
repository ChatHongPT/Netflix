<script setup lang="ts">
import type { Movie } from '../services/movieApi';
import { useFavorites } from '../composables/useFavorites';

const props = defineProps<{
  movies: Movie[];
}>();

const emit = defineEmits<{
  (e: 'toggleFavorite', movie: Movie): void;
}>();

const { isFavorite } = useFavorites();
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
    <div
      v-for="movie in movies"
      :key="movie.id"
      class="group relative bg-gray-800 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
    >
      <div class="aspect-[2/3] w-full">
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
          <h3 class="text-sm sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2">{{ movie.title }}</h3>
          <div class="flex items-center justify-between">
            <span class="text-xs sm:text-sm text-green-500">
              {{ Math.round(movie.vote_average * 10) }}% 매칭
            </span>
            <button
              @click.stop="emit('toggleFavorite', movie)"
              class="p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
            >
              <i class="fas fa-heart text-sm sm:text-base" :class="{ 'text-red-500': isFavorite(movie.id) }"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 640px) {
  .group:active .opacity-0 {
    opacity: 1;
  }
}
</style>