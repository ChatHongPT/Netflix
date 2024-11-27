<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AuthForm from '../components/AuthForm.vue';
import backgroundImage from './background.jpg'; // 같은 폴더 안에 있는 이미지 경로
import startGif from './start.gif'; // 같은 폴더 안에 있는 GIF 경로

const mode = ref<'signin' | 'signup'>('signin');
const isAnimating = ref(false);
const isLoading = ref(true);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000); // Show loading animation for 2 seconds
});

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
  <div class="min-h-screen bg-black">
    <!-- Loading Screen -->
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black flex items-center justify-center z-50"
    >
      <img
        :src="startGif"
        alt="Loading"
        class="max-w-full max-h-full object-contain"
      />
    </div>

    <!-- Auth Screen -->
    <div
      v-else
      class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
    >
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img
          :src="backgroundImage"
          alt="Background"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/60"></div>
      </div>

      <div
        class="max-w-md w-full space-y-8 bg-gray-900/90 p-8 rounded-lg shadow-2xl backdrop-blur-sm relative z-10"
      >
        <div class="form-container overflow-hidden">
          <div
            class="form-slider"
            :class="{
              'slide-left': isAnimating && mode === 'signup',
              'slide-right': isAnimating && mode === 'signin',
            }"
          >
            <h2
              class="mt-6 text-center text-3xl font-extrabold text-white mb-8"
            >
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