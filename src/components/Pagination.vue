<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}>();
</script>

<template>
  <div class="flex justify-center items-center space-x-2 mt-8">
    <button
      v-for="page in Math.min(5, totalPages)"
      :key="page"
      @click="onPageChange(page)"
      class="px-4 py-2 rounded transition-colors duration-200"
      :class="{
        'bg-blue-600 text-white': page === currentPage,
        'bg-gray-700 hover:bg-gray-600 text-gray-300': page !== currentPage,
      }"
    >
      {{ page }}
    </button>
    <span v-if="totalPages > 5" class="text-gray-400">...</span>
    <button
      v-if="totalPages > 5"
      @click="onPageChange(totalPages)"
      class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors duration-200"
    >
      {{ totalPages }}
    </button>
  </div>
</template>
