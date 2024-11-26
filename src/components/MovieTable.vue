<script setup lang="ts">
import { computed } from 'vue';
import type { Movie } from '../services/movieApi';
import { useFavorites } from '../composables/useFavorites';

const props = defineProps<{
  movies: Movie[];
}>();

const { toggleFavorite, isFavorite } = useFavorites();

const sortedMovies = computed(() => {
  return [...props.movies].sort((a, b) => b.vote_average - a.vote_average);
});
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full text-left">
      <thead>
        <tr class="border-b border-gray-700">
          <th class="py-3 px-4">제목</th>
          <th class="py-3 px-4">개봉일</th>
          <th class="py-3 px-4">평점</th>
          <th class="py-3 px-4">찜하기</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="movie in sortedMovies"
          :key="movie.id"
          class="border-b border-gray-800 hover:bg-gray-800/50 transition-colors duration-200"
        >
          <td class="py-3 px-4">
            <div class="flex items-center space-x-3">
              <img
                :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
                :alt="movie.title"
                class="w-12 h-16 object-cover rounded"
                loading="lazy"
              />
              <span class="font-medium">{{ movie.title }}</span>
            </div>
          </td>
          <td class="py-3 px-4">
            {{ new Date(movie.release_date).toLocaleDateString('ko-KR') }}
          </td>
          <td class="py-3 px-4">
            <span
              class="px-2 py-1 rounded"
              :class="{
                'bg-green-500/20 text-green-400': movie.vote_average >= 7,
                'bg-yellow-500/20 text-yellow-400':
                  movie.vote_average >= 5 && movie.vote_average < 7,
                'bg-red-500/20 text-red-400': movie.vote_average < 5,
              }"
            >
              {{ movie.vote_average.toFixed(1) }}
            </span>
          </td>
          <td class="py-3 px-4">
            <button
              @click="toggleFavorite(movie)"
              class="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 transition-transform duration-200 hover:scale-110"
                :class="{
                  'text-red-500 fill-current': isFavorite(movie.id),
                  'text-white': !isFavorite(movie.id),
                }"
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
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>