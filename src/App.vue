<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';

const route = useRoute();
const showNavbar = computed(() => route.path !== '/signin');
</script>

<template>
  <div class="min-h-screen bg-black text-white">
    <Navbar v-if="showNavbar" />
    <RouterView />
  </div>
</template>