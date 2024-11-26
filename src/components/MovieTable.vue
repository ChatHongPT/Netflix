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

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-black border-b border-gray-800">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">포스터</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">제목</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">개봉일</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">평점</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">액션</th>
        </tr>
      </thead>
      <tbody class="bg-black divide-y divide-gray-800">
        <tr v-for="movie in movies" 
            :key="movie.id"
            class="hover:bg-gray-900 transition-colors duration-200">
          <td class="px-6 py-4 whitespace-nowrap">
            <img
              :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
              :alt="movie.title"
              class="h-16 w-auto rounded"
              loading="lazy"
            />
          </td>
          <td class="px-6 py-4">
            <div class="text-sm font-medium">{{ movie.title }}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
            {{ formatDate(movie.release_date) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': movie.vote_average >= 7,
                    'bg-yellow-100 text-yellow-800': movie.vote_average >= 5 && movie.vote_average < 7,
                    'bg-red-100 text-red-800': movie.vote_average < 5
                  }">
              {{ movie.vote_average.toFixed(1) }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm">
            <button
              @click="emit('toggleFavorite', movie)"
              class="text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <i class="fas fa-heart" :class="{ 'text-red-500': isFavorite(movie.id) }"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>