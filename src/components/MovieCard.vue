<script setup lang="ts">
import type { Movie } from '../services/movieApi';
import { useFavorites } from '../composables/useFavorites';

const props = defineProps<{
  movie: Movie;
  isHovered: boolean;
}>();

const { toggleFavorite, isFavorite } = useFavorites();
</script>

<template>
  <div class="group relative">
    <div 
      class="relative overflow-hidden rounded transform-gpu transition-transform duration-300 group-hover:scale-110 group-hover:z-10"
    >
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        :alt="movie.title"
        class="w-full aspect-[2/3] object-cover rounded transition-transform duration-300"
        loading="lazy"
      />
      <div
        v-show="isHovered"
        class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 flex flex-col justify-end movie-card-content"
      >
        <div class="absolute top-4 right-4">
          <button
            @click.stop="toggleFavorite(movie)"
            class="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
          >
            <svg
              class="w-6 h-6 transition-transform duration-200 hover:scale-110"
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
        <div class="movie-info">
          <h3 class="font-bold text-sm mb-2">{{ movie.title }}</h3>
          <div class="flex items-center space-x-2 text-xs">
            <span class="text-green-500 font-semibold">
              {{ Math.round(movie.vote_average * 10) }}% 매칭
            </span>
            <span class="text-gray-300">
              {{ new Date(movie.release_date).getFullYear() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>