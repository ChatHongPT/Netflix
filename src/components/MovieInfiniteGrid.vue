<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Movie } from '../services/movieApi';
import LoadingSpinner from './LoadingSpinner.vue';
import { useFavorites } from '../composables/useFavorites';

const props = defineProps<{
  movies: Movie[];
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'loadMore'): void;
}>();

const { toggleFavorite, isFavorite } = useFavorites();

const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting && !props.loading) {
    emit('loadMore');
  }
};

const observer = ref<IntersectionObserver | null>(null);
const loadingTrigger = ref<HTMLElement | null>(null);

onMounted(() => {
  observer.value = new IntersectionObserver(handleIntersection, {
    threshold: 0.5,
  });

  if (loadingTrigger.value) {
    observer.value.observe(loadingTrigger.value);
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div
        v-for="movie in movies"
        :key="movie.id"
        class="group relative bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
          :alt="movie.title"
          class="w-full aspect-[2/3] object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <h3 class="text-lg font-bold mb-2">{{ movie.title }}</h3>
            <div class="flex items-center justify-between">
              <span class="text-green-500">
                {{ Math.round(movie.vote_average * 10) }}% 매칭
              </span>
              <button
                @click="toggleFavorite(movie)"
                class="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors duration-200"
              >
                <i class="fas fa-heart" :class="{ 'text-red-500': isFavorite(movie.id) }"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Trigger -->
    <div
      ref="loadingTrigger"
      class="flex justify-center py-8"
      v-show="movies.length > 0"
    >
      <LoadingSpinner v-if="loading" size="md" />
    </div>
  </div>
</template>