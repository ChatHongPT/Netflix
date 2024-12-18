<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFavorites } from '../composables/useFavorites';
import MovieGrid from '../components/MovieGrid.vue';
import MovieTable from '../components/MovieTable.vue';
import { useInfiniteScroll } from '../composables/useInfiniteScroll';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const { favoriteMovies, toggleFavorite } = useFavorites();
const viewMode = ref<'grid' | 'table'>('grid');
const itemsPerPage = 20;

const { 
  visibleItems, 
  loadMore, 
  hasMore, 
  loading 
} = useInfiniteScroll(favoriteMovies, itemsPerPage);

const totalMovies = computed(() => favoriteMovies.value.length);
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-20 bg-black">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
      <h2 class="text-xl sm:text-3xl font-bold">내가 찜한 콘텐츠</h2>
      <div class="flex items-center space-x-4 w-full sm:w-auto">
        <span class="text-sm sm:text-base text-gray-400">총 {{ totalMovies }}개의 콘텐츠</span>
        <div class="bg-black rounded-lg p-1 border border-gray-800">
          <button
            v-for="mode in ['grid', 'table']"
            :key="mode"
            @click="viewMode = mode as 'grid' | 'table'"
            class="px-2 sm:px-4 py-1.5 sm:py-2 rounded-md transition-colors duration-200 text-sm sm:text-base"
            :class="{
              'bg-gray-900 text-white': viewMode === mode,
              'text-gray-400 hover:text-white': viewMode !== mode
            }"
          >
            <template v-if="mode === 'grid'">
              <i class="fas fa-th-large"></i>
              <span class="hidden sm:inline ml-1">그리드</span>
            </template>
            <template v-else>
              <i class="fas fa-list"></i>
              <span class="hidden sm:inline ml-1">테이블</span>
            </template>
          </button>
        </div>
      </div>
    </div>

    <div v-if="favoriteMovies.length === 0" 
         class="text-center text-gray-400 py-8 sm:py-12 bg-black border border-gray-800 rounded-lg">
      <i class="fas fa-heart-broken text-3xl sm:text-4xl mb-3 sm:mb-4"></i>
      <p class="text-lg sm:text-xl">아직 찜한 콘텐츠가 없습니다.</p>
      <p class="mt-2 text-sm sm:text-base">영화를 둘러보고 하트 아이콘을 클릭하여 콘텐츠를 저장해보세요.</p>
    </div>

    <template v-else>
      <MovieGrid
        v-if="viewMode === 'grid'"
        :movies="visibleItems"
        @toggle-favorite="toggleFavorite"
      />
      <MovieTable
        v-else
        :movies="visibleItems"
        @toggle-favorite="toggleFavorite"
      />

      <div v-if="hasMore" 
           class="flex justify-center mt-6 sm:mt-8"
           v-intersection-observer="loadMore">
        <template v-if="loading">
          <LoadingSpinner size="md" />
        </template>
        <button
          v-else
          @click="loadMore"
          class="px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 hover:bg-gray-800 rounded-lg transition-colors duration-200 text-sm sm:text-base"
        >
          더 보기
        </button>
      </div>
    </template>
  </div>
</template>