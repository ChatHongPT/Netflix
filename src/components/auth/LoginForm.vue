<script setup lang="ts">
import { ref } from 'vue'
import { useForm, Field } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['submit'])

const schema = yup.object({
  email: yup.string().required('이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: yup.string().required('비밀번호를 입력해주세요'),
  rememberMe: yup.boolean()
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: localStorage.getItem('rememberedEmail') || '',
    rememberMe: false
  }
})

const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-300">이메일</label>
      <Field
        name="email"
        type="email"
        as="input"
        class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
      />
      <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">비밀번호</label>
      <Field
        name="password"
        type="password"
        as="input"
        class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>

    <div class="flex items-center">
      <Field
        name="rememberMe"
        type="checkbox"
        as="input"
        class="rounded bg-gray-700 border-gray-600 text-blue-600"
      />
      <label class="ml-2 block text-sm text-gray-300">자동 로그인</label>
    </div>

    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      로그인
    </button>
  </form>
</template>