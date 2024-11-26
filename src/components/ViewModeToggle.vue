<script setup lang="ts">
defineProps<{
  mode: 'infinite' | 'pagination'
  onChange: (mode: 'infinite' | 'pagination') => void
}>()
</script>

<template>
  <div class="flex justify-end mb-6 space-x-2">
    <button
      @click="onChange('infinite')"
      class="px-4 py-2 rounded transition-colors duration-200"
      :class="{
        'bg-blue-600 text-white': mode === 'infinite',
        'bg-gray-700 hover:bg-gray-600 text-gray-300': mode !== 'infinite'
      }"
    >
      무한 스크롤
    </button>
    <button
      @click="onChange('pagination')"
      class="px-4 py-2 rounded transition-colors duration-200"
      :class="{
        'bg-blue-600 text-white': mode === 'pagination',
        'bg-gray-700 hover:bg-gray-600 text-gray-300': mode !== 'pagination'
      }"
    >
      페이지 넘기기
    </button>
  </div>
</template>