<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <Navbar />
    <RouterView />
  </div>
</template>