<script setup lang="ts">
import { useForm, Field } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['submit'])

const schema = yup.object({
  email: yup.string().required('이메일을 입력해주세요').email('올바른 이메일 형식이 아닙니다'),
  password: yup.string().required('비밀번호를 입력해주세요'),
  confirmPassword: yup.string()
    .required('비밀번호 확인을 입력해주세요')
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다'),
  terms: yup.boolean()
    .oneOf([true], '약관에 동의해주세요')
})

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
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
      <label class="block text-sm font-medium text-gray-300">비밀번호 (TMDB API Key)</label>
      <Field
        name="password"
        type="password"
        as="input"
        class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
      />
      <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-300">비밀번호 확인</label>
      <Field
        name="confirmPassword"
        type="password"
        as="input"
        class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
      />
      <span v-if="errors.confirmPassword" class="text-red-500 text-sm">{{ errors.confirmPassword }}</span>
    </div>

    <div class="flex items-center">
      <Field
        name="terms"
        type="checkbox"
        as="input"
        class="rounded bg-gray-700 border-gray-600 text-blue-600"
      />
      <label class="ml-2 block text-sm text-gray-300">
        <span>서비스 이용약관에 동의합니다</span>
      </label>
    </div>
    <span v-if="errors.terms" class="text-red-500 text-sm block">{{ errors.terms }}</span>

    <button
      type="submit"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      회원가입
    </button>
  </form>
</template>