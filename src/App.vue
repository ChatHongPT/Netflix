<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import Navbar from './components/Navbar.vue'

const route = useRoute()

const hideNavbar = computed(() => {
  return route.path === '/signin'
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Navbar v-if="!hideNavbar" />
    <RouterView />
  </div>
</template>