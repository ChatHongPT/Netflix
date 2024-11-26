<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import LoginForm from '../components/auth/LoginForm.vue'
import SignupForm from '../components/auth/SignupForm.vue'

const isLogin = ref(true)
const router = useRouter()
const toast = useToast()

const toggleForm = () => {
  isLogin.value = !isLogin.value
}

const handleLogin = (data: any) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find((u: any) => u.email === data.email)
  
  if (user && user.password === data.password) {
    localStorage.setItem('isAuthenticated', 'true')
    if (data.rememberMe) {
      localStorage.setItem('rememberedEmail', data.email)
    }
    toast.success('로그인 성공!')
    router.push('/')
  } else {
    toast.error('이메일 또는 비밀번호가 잘못되었습니다.')
  }
}

const handleSignup = (data: any) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  
  if (data.password === '517ff51627420bdc50a849194a4ecee2') {
    const newUser = {
      email: data.email,
      password: data.password
    }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    toast.success('회원가입 성공!')
    isLogin.value = true
  } else {
    toast.error('유효하지 않은 API 키입니다.')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 px-4">
    <div class="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
      <div class="text-center">
        <h2 class="text-3xl font-bold">{{ isLogin ? '로그인' : '회원가입' }}</h2>
      </div>

      <div class="mt-8">
        <transition name="fade" mode="out-in">
          <LoginForm v-if="isLogin" @submit="handleLogin" />
          <SignupForm v-else @submit="handleSignup" />
        </transition>
      </div>

      <div class="text-center">
        <button
          @click="toggleForm"
          class="text-blue-400 hover:text-blue-500 transition-colors"
        >
          {{ isLogin ? '회원가입하기' : '로그인하기' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>