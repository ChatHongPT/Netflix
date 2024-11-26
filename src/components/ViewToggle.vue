<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: 'grid' | 'table';
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'grid' | 'table'): void;
}>();

const toggle = () => {
  emit('update:modelValue', props.modelValue === 'grid' ? 'table' : 'grid');
};
</script>

<template>
  <button
    @click="toggle"
    class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
    :title="modelValue === 'grid' ? '테이블 보기' : '그리드 보기'"
  >
    <svg
      v-if="modelValue === 'grid'"
      class="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 10h16M4 14h16M4 18h16"
      />
    </svg>
    <svg
      v-else
      class="w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  </button>
</template>