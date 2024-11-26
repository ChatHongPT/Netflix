<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getPopularMovies, type Movie } from '../services/movieApi';
import MovieGrid from '../components/MovieGrid.vue';
import MovieTable from '../components/MovieTable.vue';
import ViewToggle from '../components/ViewToggle.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const movies = ref<Movie[]>([]);
const loading = ref(true);
const viewMode = ref<'grid' | 'table'>('grid');

onMounted(async () => {
  try {
    const response = await getPopularMovies();
    movies.value = response.data.results;
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold">찾아보기</h2>
      <ViewToggle v-model="viewMode" />
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <LoadingSpinner size="lg" />
    </div>
    <template v-else>
      <MovieGrid v-if="viewMode === 'grid'" :movies="movies" />
      <MovieTable v-else :movies="movies" />
    </template>
  </div>
</template>