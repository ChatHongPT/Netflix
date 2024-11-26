<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold">MoviePro</RouterLink>
      <div class="space-x-4">
        <RouterLink to="/" class="hover:text-gray-300">홈</RouterLink>
        <RouterLink to="/trending" class="hover:text-gray-300">대세 콘텐츠</RouterLink>
        <RouterLink to="/browse" class="hover:text-gray-300">찾아보기</RouterLink>
        <RouterLink to="/my-list" class="hover:text-gray-300">내가 찜한 콘텐츠</RouterLink>
        <RouterLink to="/login" class="hover:text-gray-300">로그인</RouterLink>
      </div>
    </div>
  </nav>
</template>