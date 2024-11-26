<script setup lang="ts">
defineProps<{
  size?: 'sm' | 'md' | 'lg';
}>();
</script>

<template>
  <div class="flex items-center justify-center">
    <div
      class="animate-spin rounded-full border-t-2 border-b-2 border-white"
      :class="{
        'w-8 h-8': size === 'sm',
        'w-12 h-12': size === 'md' || !size,
        'w-16 h-16': size === 'lg',
      }"
    ></div>
  </div>
</template>