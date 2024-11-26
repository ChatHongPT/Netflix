<script setup lang="ts">
import { useFavorites } from '../composables/useFavorites';
import MovieRow from '../components/MovieRow.vue';

const { favoriteMovies } = useFavorites();
</script>

<template>
  <div class="container mx-auto px-4 py-8 mt-20">
    <h2 class="text-3xl font-bold mb-6">내가 찜한 콘텐츠</h2>
    <div v-if="favoriteMovies.length === 0" class="text-center text-gray-400 py-12">
      <p class="text-xl">아직 찜한 콘텐츠가 없습니다.</p>
      <p class="mt-2">영화를 둘러보고 하트 아이콘을 클릭하여 콘텐츠를 저장해보세요.</p>
    </div>
    <MovieRow
      v-else
      title="찜한 콘텐츠"
      :movies="favoriteMovies"
      :loading="false"
    />
  </div>
</template>