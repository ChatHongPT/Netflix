<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useFavorites } from '../composables/useFavorites';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';

const { favoriteMovies, toggleFavorite } = useFavorites();
const itemsPerPage = 10;
const loading = ref(false);

const { 
  visibleItems: visibleMovies,
  loadMore,
  hasMore
} = useInfiniteScroll(favoriteMovies, itemsPerPage);

const sortBy = ref<'title' | 'date'>('date');
const sortOrder = ref<'asc' | 'desc'>('desc');

const sortedMovies = computed(() => {
  return [...visibleMovies.value].sort((a, b) => {
    let comparison = 0;
    switch (sortBy.value) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'date':
        comparison = new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        break;
    }
    return sortOrder.value === 'asc' ? comparison : -comparison;
  });
});

const toggleSort = (field: typeof sortBy.value) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = field;
    sortOrder.value = 'desc';
  }
};

const getSortIcon = (field: typeof sortBy.value) => {
  if (sortBy.value !== field) return '↕️';
  return sortOrder.value === 'asc' ? '↑' : '↓';
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-16">
    <div class="flex justify-between items-center mb-8">
      <div class="flex items-center space-x-4">
        <h2 class="text-xl font-medium">내가 찜한 콘텐츠</h2>
        <span class="text-sm text-gray-400">{{ favoriteMovies.length }}개의 콘텐츠</span>
      </div>
    </div>

    <div v-if="favoriteMovies.length === 0" 
         class="text-center text-gray-400 py-12 bg-black/50 rounded-lg border border-gray-800">
      <p class="text-lg">아직 찜한 콘텐츠가 없습니다.</p>
      <p class="mt-2 text-sm">영화를 둘러보고 하트 아이콘을 클릭하여 콘텐츠를 저장해보세요.</p>
    </div>

    <div v-else class="bg-black/50 rounded-lg overflow-hidden border border-gray-800">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-800">
          <thead class="bg-black/70">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                포스터
              </th>
              <th scope="col" 
                  class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white"
                  @click="toggleSort('title')">
                제목 {{ getSortIcon('title') }}
              </th>
              <th scope="col" 
                  class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:text-white"
                  @click="toggleSort('date')">
                개봉일 {{ getSortIcon('date') }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="movie in sortedMovies" 
                :key="movie.id"
                class="group hover:bg-gray-900/50 transition-colors duration-200">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="w-16 h-24 overflow-hidden rounded">
                  <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
                       :alt="movie.title"
                       class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-200"
                       loading="lazy">
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-white group-hover:text-red-500">{{ movie.title }}</div>
                <div class="text-sm text-gray-400 line-clamp-2 mt-1">{{ movie.overview }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400 group-hover:text-gray-300">
                {{ formatDate(movie.release_date) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="hasMore" 
           class="text-center py-4 bg-black/70"
           v-intersect="loadMore">
        <LoadingSpinner size="sm" />
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
</style>