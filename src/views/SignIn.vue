<script setup lang="ts">
import { ref } from 'vue';
import AuthForm from '../components/AuthForm.vue';

const mode = ref<'signin' | 'signup'>('signin');
const isAnimating = ref(false);

const toggleMode = () => {
  isAnimating.value = true;
  setTimeout(() => {
    mode.value = mode.value === 'signin' ? 'signup' : 'signin';
    isAnimating.value = false;
  }, 300);
};

const handleSignupSuccess = (userData: { email: string; password: string }) => {
  isAnimating.value = true;
  setTimeout(() => {
    mode.value = 'signin';
    isAnimating.value = false;
    const authForm = document.querySelector(
      'input[type="email"]'
    ) as HTMLInputElement;
    if (authForm) {
      authForm.value = userData.email;
    }
  }, 300);
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
      <div class="form-container overflow-hidden">
        <div
          class="form-slider"
          :class="{
            'slide-left': isAnimating && mode === 'signup',
            'slide-right': isAnimating && mode === 'signin',
          }"
        >
          <h2 class="mt-6 text-center text-3xl font-extrabold text-white mb-8">
            {{ mode === 'signin' ? '로그인' : '회원가입' }}
          </h2>

          <AuthForm :mode="mode" @success="handleSignupSuccess" />

          <div class="text-center mt-4">
            <button
              @click="toggleMode"
              class="text-blue-400 hover:text-blue-500 text-sm transition-colors duration-200"
              :disabled="isAnimating"
            >
              {{ mode === 'signin' ? '회원가입하기' : '로그인하기' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  position: relative;
}

.form-slider {
  transition: transform 0.3s ease-in-out;
}

.slide-left {
  transform: translateX(-100%);
}

.slide-right {
  transform: translateX(100%);
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
</style>
