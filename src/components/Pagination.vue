<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'pageChange', page: number): void;
}>();

const pages = computed(() => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);

  if (props.totalPages <= 1) {
    return range;
  }

  for (let i = props.currentPage - delta; i <= props.currentPage + delta; i++) {
    if (i < props.totalPages && i > 1) {
      range.push(i);
    }
  }
  range.push(props.totalPages);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
});
</script>

<template>
  <div class="flex justify-center items-center space-x-2 my-8">
    <button
      @click="emit('pageChange', currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-md transition-colors duration-200"
      :class="{
        'bg-gray-700 text-white hover:bg-gray-600': currentPage !== 1,
        'bg-gray-800 text-gray-500 cursor-not-allowed': currentPage === 1
      }"
    >
      <i class="fas fa-chevron-left"></i>
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="typeof page === 'number' && emit('pageChange', page)"
      class="px-4 py-2 rounded-md transition-colors duration-200"
      :class="{
        'bg-red-600 text-white': page === currentPage,
        'bg-gray-700 text-white hover:bg-gray-600': typeof page === 'number' && page !== currentPage,
        'bg-transparent text-gray-500 cursor-default': page === '...'
      }"
    >
      {{ page }}
    </button>

    <button
      @click="emit('pageChange', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-md transition-colors duration-200"
      :class="{
        'bg-gray-700 text-white hover:bg-gray-600': currentPage !== totalPages,
        'bg-gray-800 text-gray-500 cursor-not-allowed': currentPage === totalPages
      }"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>