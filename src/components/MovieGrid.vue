<script setup lang="ts">
import { ref } from 'vue';
import type { Movie } from '../services/movieApi';
import MovieCard from './MovieCard.vue';

defineProps<{
  movies: Movie[];
  loading?: boolean;
}>();

const hoveredMovie = ref<number | null>(null);
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      :is-hovered="hoveredMovie === movie.id"
      @mouseenter="hoveredMovie = movie.id"
      @mouseleave="hoveredMovie = null"
    />
  </div>
</template>