<template>
  <div class="container mx-auto px-4 py-8 max-w-md">
    <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-6">로그인</h2>
      <form class="space-y-4">
        <div>
          <label class="block mb-1">이메일</label>
          <input type="email" class="w-full p-2 rounded bg-gray-700" />
        </div>
        <div>
          <label class="block mb-1">비밀번호</label>
          <input type="password" class="w-full p-2 rounded bg-gray-700" />
        </div>
        <button type="submit" class="w-full bg-blue-600 p-2 rounded hover:bg-blue-700">
          로그인
        </button>
      </form>
    </div>
  </div>
</template>