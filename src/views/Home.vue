<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  type Movie,
} from '../services/movieApi';
import MovieRow from '../components/MovieRow.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';

const featuredMovies = ref<Movie[]>([]);
const currentFeaturedIndex = ref(0);
const popularMovies = ref<Movie[]>([]);
const topRatedMovies = ref<Movie[]>([]);
const nowPlayingMovies = ref<Movie[]>([]);
const loading = ref(true);

const rowsLoading = ref({
  popular: true,
  topRated: true,
  nowPlaying: true,
});

const bannerInterval = ref<number>();

const changeFeaturedMovie = () => {
  if (featuredMovies.value.length > 0) {
    currentFeaturedIndex.value =
      (currentFeaturedIndex.value + 1) % featuredMovies.value.length;
  }
};

const startBannerRotation = () => {
  bannerInterval.value = window.setInterval(changeFeaturedMovie, 5000);
};

const stopBannerRotation = () => {
  if (bannerInterval.value) {
    clearInterval(bannerInterval.value);
  }
};

const fetchMovies = async () => {
  try {
    const [popularRes, topRatedRes, nowPlayingRes] = await Promise.all([
      getPopularMovies().then(res => {
        rowsLoading.value.popular = false;
        return res;
      }),
      getTopRatedMovies().then(res => {
        rowsLoading.value.topRated = false;
        return res;
      }),
      getNowPlayingMovies().then(res => {
        rowsLoading.value.nowPlaying = false;
        return res;
      }),
    ]);

    popularMovies.value = popularRes.data.results;
    topRatedMovies.value = topRatedRes.data.results;
    nowPlayingMovies.value = nowPlayingRes.data.results;

    featuredMovies.value = popularRes.data.results
      .filter((movie) => movie.backdrop_path)
      .slice(0, 5);

    startBannerRotation();
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMovies();
});

onUnmounted(() => {
  stopBannerRotation();
});

const currentFeaturedMovie = computed(
  () => featuredMovies.value[currentFeaturedIndex.value]
);
</script>

<template>
  <div class="min-h-screen bg-black">
    <!-- Loading State for Hero Section -->
    <div
      v-if="loading && !currentFeaturedMovie"
      class="h-[85vh] w-full flex items-center justify-center bg-black"
    >
      <LoadingSpinner size="lg" />
    </div>

    <!-- Featured Movie Hero Section -->
    <div
      v-else-if="currentFeaturedMovie"
      class="relative h-[85vh] w-full overflow-hidden"
    >
      <transition name="fade" mode="out-in">
        <img
          :key="currentFeaturedMovie.id"
          :src="`https://image.tmdb.org/t/p/original${currentFeaturedMovie.backdrop_path}`"
          :alt="currentFeaturedMovie.title"
          class="w-full h-full object-cover"
        />
      </transition>
      <div class="absolute inset-0 netflix-gradient"></div>
      <div class="absolute bottom-[30%] left-0 p-12 space-y-4 max-w-2xl">
        <h1 class="text-4xl font-bold text-shadow-lg">
          {{ currentFeaturedMovie.title }}
        </h1>
        <p class="text-lg text-gray-200 line-clamp-3 text-shadow-md">
          {{ currentFeaturedMovie.overview }}
        </p>
      </div>
      <!-- Banner Indicators -->
      <div class="absolute bottom-[20%] right-4 flex space-x-2">
        <button
          v-for="(_, index) in featuredMovies"
          :key="index"
          @click="currentFeaturedIndex = index"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="
            index === currentFeaturedIndex
              ? 'bg-white scale-125'
              : 'bg-gray-500 hover:bg-gray-400'
          "
        ></button>
      </div>
    </div>

    <!-- Movie Rows -->
    <div class="relative z-10 -mt-64 pb-16 bg-black">
      <MovieRow
        title="인기 콘텐츠"
        :movies="popularMovies"
        :loading="rowsLoading.popular"
      />
      <MovieRow
        title="평단의 찬사를 받은 영화"
        :movies="topRatedMovies"
        :loading="rowsLoading.topRated"
      />
      <MovieRow
        title="현재 상영작"
        :movies="nowPlayingMovies"
        :loading="rowsLoading.nowPlaying"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.text-shadow-lg {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.text-shadow-md {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>