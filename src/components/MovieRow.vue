<script setup lang="ts">
import { ref } from 'vue'
import type { Movie } from '../services/movieApi'

defineProps<{
  title: string
  movies: Movie[]
}>()

const hoveredMovie = ref<number | null>(null)
</script>

<template>
  <div class="mb-8 pl-12">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <div class="relative">
      <div class="flex space-x-2 overflow-x-auto scrollbar-hide">
        <div
          v-for="movie in movies"
          :key="movie.id"
          class="flex-none w-[200px] transition-all duration-300 relative"
          :class="{ 'movie-card-hover': hoveredMovie === movie.id }"
          @mouseenter="hoveredMovie = movie.id"
          @mouseleave="hoveredMovie = null"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            class="w-full h-[300px] object-cover rounded"
          />
          <div
            v-if="hoveredMovie === movie.id"
            class="absolute inset-0 bg-black bg-opacity-75 rounded p-4 flex flex-col justify-end"
          >
            <h3 class="font-bold text-sm">{{ movie.title }}</h3>
            <div class="flex items-center space-x-2 mt-2 text-xs">
              <span class="text-green-500">{{ Math.round(movie.vote_average * 10) }}% 매칭</span>
              <span>{{ new Date(movie.release_date).getFullYear() }}</span>
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
</style>