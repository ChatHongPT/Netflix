<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { getGenres, searchMovies, getMoviesByGenre, type Movie, type Genre } from '../services/movieApi';
import MovieTable from '../components/MovieTable.vue';
import MovieInfiniteGrid from '../components/MovieInfiniteGrid.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Pagination from '../components/Pagination.vue';
import ScrollTopButton from '../components/ScrollTopButton.vue';
import { useDebounce } from '../composables/useDebounce';

const viewMode = ref<'table' | 'infinite'>('table');
const movies = ref<Movie[]>([]);
const genres = ref<Genre[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);

// Search and Filter States
const searchQuery = ref('');
const selectedGenre = ref<number>(0);
const selectedRating = ref<number>(0);
const sortBy = ref<'popularity' | 'rating' | 'date'>('popularity');
const yearFilter = ref<string>('');

const debouncedSearch = useDebounce(searchQuery, 500);

// Computed Properties
const filteredMovies = computed(() => {
  let result = [...movies.value];

  // Filter by genre
  if (selectedGenre.value > 0) {
    result = result.filter(movie => 
      movie.genre_ids.includes(selectedGenre.value)
    );
  }

  // Filter by rating
  if (selectedRating.value > 0) {
    result = result.filter(movie => movie.vote_average >= selectedRating.value);
  }

  // Filter by year
  if (yearFilter.value) {
    result = result.filter(movie => 
      movie.release_date.startsWith(yearFilter.value)
    );
  }

  // Sort movies
  switch (sortBy.value) {
    case 'rating':
      result.sort((a, b) => b.vote_average - a.vote_average);
      break;
    case 'date':
      result.sort((a, b) => 
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
      break;
    default:
      // Already sorted by popularity from API
      break;
  }

  return result;
});

// Methods
const fetchMovies = async (page: number) => {
  try {
    loading.value = true;
    const response = await searchMovies(debouncedSearch.value || 'a', page);
    
    if (viewMode.value === 'infinite' && page > 1) {
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

const fetchGenres = async () => {
  try {
    const response = await getGenres();
    genres.value = response.data.genres;
  } catch (error) {
    console.error('Failed to fetch genres:', error);
  }
};

const handlePageChange = async (page: number) => {
  currentPage.value = page;
  await fetchMovies(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetFilters = () => {
  selectedGenre.value = 0;
  selectedRating.value = 0;
  sortBy.value = 'popularity';
  yearFilter.value = '';
  searchQuery.value = '';
};

const loadMore = async () => {
  if (!loading.value && currentPage.value < totalPages.value) {
    currentPage.value++;
    await fetchMovies(currentPage.value);
  }
};

// Watchers
watch(debouncedSearch, () => {
  currentPage.value = 1;
  fetchMovies(1);
});

// Lifecycle
onMounted(() => {
  fetchGenres();
  fetchMovies(1);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <!-- Header and View Toggle -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">찾아보기</h2>
      <div class="flex items-center space-x-4">
        <div class="bg-black rounded-lg p-1 border border-gray-800">
          <button
            v-for="mode in ['table', 'infinite']"
            :key="mode"
            @click="viewMode = mode as 'table' | 'infinite'"
            class="px-4 py-2 rounded-md transition-colors duration-200"
            :class="{
              'bg-gray-900 text-white': viewMode === mode,
              'text-gray-400 hover:text-white': viewMode !== mode
            }"
          >
            <i :class="mode === 'table' ? 'fas fa-table' : 'fas fa-stream'"></i>
            {{ mode === 'table' ? ' 테이블' : ' 무한 스크롤' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-gray-900 p-6 rounded-lg mb-8 space-y-4">
      <!-- Search Input -->
      <div class="flex gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="영화 검색..."
            class="w-full px-4 py-2 bg-gray-800 rounded-lg focus:ring-2 focus:ring-red-500"
          />
        </div>
        <button
          @click="resetFilters"
          class="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700"
        >
          필터 초기화
        </button>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Genre Filter -->
        <div class="space-y-2">
          <label class="text-sm text-gray-400">장르</label>
          <select
            v-model="selectedGenre"
            class="w-full bg-gray-800 rounded-lg p-2"
          >
            <option value="0">전체</option>
            <option
              v-for="genre in genres"
              :key="genre.id"
              :value="genre.id"
            >
              {{ genre.name }}
            </option>
          </select>
        </div>

        <!-- Rating Filter -->
        <div class="space-y-2">
          <label class="text-sm text-gray-400">최소 평점</label>
          <select
            v-model="selectedRating"
            class="w-full bg-gray-800 rounded-lg p-2"
          >
            <option value="0">전체</option>
            <option value="7">7점 이상</option>
            <option value="8">8점 이상</option>
            <option value="9">9점 이상</option>
          </select>
        </div>

        <!-- Year Filter -->
        <div class="space-y-2">
          <label class="text-sm text-gray-400">개봉년도</label>
          <input
            v-model="yearFilter"
            type="number"
            min="1900"
            :max="new Date().getFullYear()"
            placeholder="연도 입력"
            class="w-full px-4 py-2 bg-gray-800 rounded-lg"
          />
        </div>

        <!-- Sort By -->
        <div class="space-y-2">
          <label class="text-sm text-gray-400">정렬</label>
          <select
            v-model="sortBy"
            class="w-full bg-gray-800 rounded-lg p-2"
          >
            <option value="popularity">인기순</option>
            <option value="rating">평점순</option>
            <option value="date">최신순</option>
          </select>
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
      <div v-if="filteredMovies.length === 0" 
           class="text-center py-12 text-gray-400">
        <i class="fas fa-search text-4xl mb-4"></i>
        <p class="text-xl">검색 결과가 없습니다</p>
      </div>

      <template v-else>
        <!-- Table View -->
        <template v-if="viewMode === 'table'">
          <MovieTable :movies="filteredMovies" />
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </template>

        <!-- Infinite Scroll View -->
        <template v-else>
          <MovieInfiniteGrid
            :movies="filteredMovies"
            :loading="loading"
            @load-more="loadMore"
          />
        </template>
      </template>
    </template>

    <!-- Scroll to Top Button -->
    <ScrollTopButton />
  </div>
</template>