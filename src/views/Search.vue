<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { getGenres, searchMovies, getMoviesByFilters, type Movie, type Genre } from '../services/movieApi';
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
const sortBy = ref<string>('popularity.desc');
const yearFilter = ref<string>('');

const { debouncedValue: debouncedSearch, update: updateDebouncedSearch } = useDebounce('', 500);

const sortOptions = [
  { value: 'popularity.desc', label: '인기순' },
  { value: 'vote_average.desc', label: '평점 높은순' },
  { value: 'vote_average.asc', label: '평점 낮은순' },
  { value: 'primary_release_date.desc', label: '최신순' },
  { value: 'primary_release_date.asc', label: '오래된순' },
  { value: 'revenue.desc', label: '수익순' },
];

// Methods
const fetchMovies = async (page: number) => {
  try {
    loading.value = true;
    let response;

    if (debouncedSearch.value) {
      response = await searchMovies(debouncedSearch.value, page);
    } else {
      response = await getMoviesByFilters({
        genreId: selectedGenre.value || undefined,
        minRating: selectedRating.value || undefined,
        year: yearFilter.value || undefined,
        sortBy: sortBy.value,
        page,
      });
    }
    
    if (viewMode.value === 'infinite' && page > 1) {
      movies.value = [...movies.value, ...response.data.results];
    } else {
      movies.value = response.data.results;
    }
    
    totalPages.value = Math.min(response.data.total_pages, 500);
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

const handlePageChange = (page: number) => {
  if (page === currentPage.value) return;
  currentPage.value = page;
  fetchMovies(page);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetFilters = () => {
  selectedGenre.value = 0;
  selectedRating.value = 0;
  sortBy.value = 'popularity.desc';
  yearFilter.value = '';
  searchQuery.value = '';
  updateDebouncedSearch('');
  currentPage.value = 1;
  fetchMovies(1);
};

const loadMore = async () => {
  if (!loading.value && currentPage.value < totalPages.value) {
    currentPage.value++;
    await fetchMovies(currentPage.value);
  }
};

// Watchers
watch(searchQuery, (newValue) => {
  updateDebouncedSearch(newValue);
});

watch([debouncedSearch, selectedGenre, selectedRating, sortBy, yearFilter], () => {
  currentPage.value = 1;
  fetchMovies(1);
}, { deep: true });

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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Rating Filter -->
        <div class="space-y-2">
          <label class="text-sm text-gray-400">최소 평점</label>
          <select
            v-model="selectedRating"
            class="w-full bg-gray-800 rounded-lg p-2"
          >
            <option value="0">전체</option>
            <option value="5">5점 이상</option>
            <option value="6">6점 이상</option>
            <option value="7">7점 이상</option>
            <option value="8">8점 이상</option>
            <option value="9">9점 이상</option>
          </select>
        </div>

        <!-- Year Filter -->
        <div class="space-y-2">
          <label class="text-sm text-gray-400">개봉년도</label>
          <select
            v-model="yearFilter"
            class="w-full bg-gray-800 rounded-lg p-2"
          >
            <option value="">전체</option>
            <option
              v-for="year in Array.from(
                { length: 30 },
                (_, i) => new Date().getFullYear() - i
              )"
              :key="year"
              :value="year"
            >
              {{ year }}년
            </option>
          </select>
        </div>

        <!-- Sort By -->
        <div class="space-y-2">
          <label class="text-sm text-gray-400">정렬</label>
          <select
            v-model="sortBy"
            class="w-full bg-gray-800 rounded-lg p-2"
          >
            <option
              v-for="option in sortOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
        </div>

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
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && movies.length === 0" 
         class="flex justify-center items-center min-h-[60vh]">
      <LoadingSpinner size="lg" />
    </div>

    <!-- Content -->
    <template v-else>
      <div v-if="movies.length === 0" 
           class="text-center py-12 text-gray-400">
        <i class="fas fa-search text-4xl mb-4"></i>
        <p class="text-xl">검색 결과가 없습니다</p>
      </div>

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
    </template>

    <!-- Scroll to Top Button -->
    <ScrollTopButton />
  </div>
</template>