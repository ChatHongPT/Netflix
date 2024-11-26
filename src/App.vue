<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();
const showNavbar = computed(() => route.path !== '/signin');
const isLandscape = ref(false);

const checkOrientation = () => {
  isLandscape.value = window.innerWidth > window.innerHeight;
};

onMounted(() => {
  checkOrientation();
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);
});
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar
      v-if="showNavbar"
      :class="{ 'navbar-mobile': isLandscape }"
    />
    <RouterView :class="{ 'content-landscape': isLandscape }" />
  </div>
</template>

<style>
/* 모바일 사파리에서 하단 바 대응 */
@supports (padding: max(0px)) {
  .min-h-screen {
    min-height: calc(100vh - env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);
  }
}

/* 터치 디바이스 최적화 */
@media (hover: none) {
  * {
    cursor: default !important;
  }
}

/* 화면 회전 애니메이션 */
@media screen and (orientation: landscape) {
  .content-landscape {
    transition: margin-top 0.3s ease;
  }
}
</style>