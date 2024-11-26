<script setup lang="ts">
import { ref } from 'vue';
import type { Movie } from '../services/movieApi';
import LoadingSpinner from './LoadingSpinner.vue';
import { useFavorites } from '../composables/useFavorites';

defineProps<{
  title: string;
  movies: Movie[];
  loading?: boolean;
}>();

const hoveredMovie = ref<number | null>(null);
const { toggleFavorite, isFavorite } = useFavorites();
</script>

<template>
  <div class="mb-6 sm:mb-8 px-4 sm:pl-12">
    <h2 class="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{{ title }}</h2>
    <div class="relative min-h-[180px] sm:min-h-[300px]">
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
        <LoadingSpinner size="md" />
      </div>
      <div v-else class="flex space-x-2 overflow-x-auto scrollbar-hide">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="flex-none relative group"
          :class="{ 'w-[120px] sm:w-[200px]': true }"
          @mouseenter="hoveredMovie = movie.id"
          @mouseleave="hoveredMovie = null"
        >
          <div class="relative overflow-hidden rounded transform-gpu transition-transform duration-300 group-hover:scale-110 group-hover:z-10">
            <img
              :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
              :alt="movie.title"
              class="movie-row-poster w-full object-cover rounded transition-transform duration-300"
              :class="{ 'h-[180px] sm:h-[300px]': true }"
              loading="lazy"
            />
            <div
              v-if="hoveredMovie === movie.id"
              class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 sm:p-4 flex flex-col justify-end"
            >
              <div class="absolute top-2 right-2 sm:top-4 sm:right-4">
                <button
                  @click.stop="toggleFavorite(movie)"
                  class="p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
                >
                  <svg
                    class="w-4 h-4 sm:w-6 sm:h-6 transition-transform duration-200 hover:scale-110"
                    :class="{ 'text-red-500 fill-current': isFavorite(movie.id), 'text-white': !isFavorite(movie.id) }"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <h3 class="text-xs sm:text-sm font-bold mb-1 sm:mb-2 line-clamp-2">
                {{ movie.title }}
              </h3>
              <div class="flex items-center space-x-2 text-xs">
                <span class="text-green-500 font-semibold">
                  {{ Math.round(movie.vote_average * 10) }}% 매칭
                </span>
                <span class="text-gray-300 text-xs">
                  {{ new Date(movie.release_date).getFullYear() }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.group {
  perspective: 1000px;
}

.group:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>