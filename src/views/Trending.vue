<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPopularMovies, type Movie } from '../services/movieApi';
import MovieTable from '../components/MovieTable.vue';
import MovieInfiniteGrid from '../components/MovieInfiniteGrid.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Pagination from '../components/Pagination.vue';
import ScrollTopButton from '../components/ScrollTopButton.vue';

const viewMode = ref<'table' | 'infinite'>('table');
const movies = ref<Movie[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const itemsPerPage = 20;

const fetchMovies = async (page: number) => {
  try {
    loading.value = true;
    const response = await getPopularMovies(page);
    if (viewMode.value === 'infinite') {
      movies.value = [...movies.value, ...response.data.results];
    } else {
      movies.value = response.data.results;
    }
    totalPages.value = response.data.total_pages;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  } finally {
    loading.value = false;
  }
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await fetchMovies(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleViewModeChange = (mode: 'table' | 'infinite') => {
  viewMode.value = mode;
  movies.value = [];
  currentPage.value = 1;
  fetchMovies(1);
};

const loadMore = async () => {
  if (!loading.value && currentPage.value < totalPages.value) {
    currentPage.value++;
    await fetchMovies(currentPage.value);
  }
};

onMounted(() => {
  fetchMovies(1);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">대세 콘텐츠</h2>
      <div class="flex items-center space-x-4">
        <div class="bg-black rounded-lg p-1 border border-gray-800">
          <button
            v-for="mode in ['table', 'infinite']"
            :key="mode"
            @click="handleViewModeChange(mode as 'table' | 'infinite')"
            class="px-4 py-2 rounded-md transition-colors duration-200"
            :class="{
              'bg-gray-900 text-white': viewMode === mode,
              'text-gray-400 hover:text-white': viewMode !== mode
            }"
          >
            <template v-if="mode === 'table'">
              <i class="fas fa-table"></i> 테이블
            </template>
            <template v-else>
              <i class="fas fa-stream"></i> 무한 스크롤
            </template>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && movies.length === 0" 
         class="flex justify-center items-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Table View -->
      <template v-if="viewMode === 'table'">
        <MovieTable :movies="movies" />
        <Pagination
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </template>

      <!-- Infinite Scroll View -->
      <template v-else>
        <MovieInfiniteGrid
          :movies="movies"
          :loading="loading"
          @load-more="loadMore"
        />
      </template>
    </template>

    <!-- Scroll to Top Button -->
    <ScrollTopButton />
  </div>
</template>