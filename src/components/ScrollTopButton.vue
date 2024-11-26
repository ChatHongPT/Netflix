<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const showButton = ref(false);

const checkScroll = () => {
  showButton.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});
</script>

<template>
  <Transition name="fade">
    <button
      v-show="showButton"
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      aria-label="Scroll to top"
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>