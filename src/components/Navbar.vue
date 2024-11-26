<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useAuth } from '../composables/useAuth';

const router = useRouter();
const toast = useToast();
const { isAuthenticated, checkAuth, logout } = useAuth();
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  checkAuth();
  window.addEventListener('scroll', handleScroll);
});

watch(
  () => router.currentRoute.value,
  () => {
    checkAuth();
  },
  { immediate: true }
);

const handleLogout = () => {
  logout();
  toast.success('로그아웃되었습니다');
  router.push('/signin');
};
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 transition-all duration-300 px-12 py-4"
    :class="{
      'bg-black': isScrolled,
      'bg-gradient-to-b from-black/70 to-transparent': !isScrolled,
    }"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-8">
        <RouterLink
          to="/"
          class="text-2xl font-bold text-red-600 no-underline hover:text-red-600"
          >NETFLIX</RouterLink
        >
        <div v-if="isAuthenticated" class="flex space-x-6">
          <RouterLink
            to="/popular"
            class="text-sm hover:text-gray-300 transition"
            >대세 콘텐츠</RouterLink
          >
          <RouterLink
            to="/search"
            class="text-sm hover:text-gray-300 transition"
            >찾아보기</RouterLink
          >
          <RouterLink
            to="/wishlist"
            class="text-sm hover:text-gray-300 transition"
            >내가 찜한 콘텐츠</RouterLink
          >
        </div>
      </div>
      <div v-if="isAuthenticated" class="flex items-center space-x-4">
        <button
          @click="handleLogout"
          class="text-sm hover:text-gray-300 transition"
        >
          로그아웃
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active:not(.text-red-600) {
  color: #fff;
  font-weight: 500;
}

.text-red-600 {
  color: rgb(220, 38, 38) !important;
}
</style>
