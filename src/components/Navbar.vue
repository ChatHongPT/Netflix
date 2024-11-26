<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const toast = useToast()
const { isAuthenticated, checkAuth, logout } = useAuth()

onMounted(() => {
  checkAuth()
})

// Watch for route changes to recheck auth status
watch(() => router.currentRoute.value, () => {
  checkAuth()
}, { immediate: true })

const handleLogout = () => {
  logout()
  toast.success('로그아웃되었습니다')
  router.push('/signin')
}
</script>

<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold">MoviePro</RouterLink>
      <div class="space-x-4">
        <template v-if="isAuthenticated">
          <RouterLink to="/" class="hover:text-gray-300">홈</RouterLink>
          <RouterLink to="/trending" class="hover:text-gray-300">대세 콘텐츠</RouterLink>
          <RouterLink to="/browse" class="hover:text-gray-300">찾아보기</RouterLink>
          <RouterLink to="/my-list" class="hover:text-gray-300">내가 찜한 콘텐츠</RouterLink>
          <button 
            @click="handleLogout"
            class="text-white hover:text-gray-300 bg-red-600 hover:bg-red-700 px-3 py-1 rounded transition-colors duration-200"
          >
            로그아웃
          </button>
        </template>
        <RouterLink 
          v-else 
          to="/signin" 
          class="text-white hover:text-gray-300 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors duration-200"
        >
          로그인
        </RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.router-link-active {
  color: #60A5FA;
}
</style>