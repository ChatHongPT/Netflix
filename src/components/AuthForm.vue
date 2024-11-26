<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { validateCredentials } from '../services/api';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

const props = defineProps<{
  mode: 'signin' | 'signup';
}>();

const emit = defineEmits(['success']);

const router = useRouter();
const toast = useToast();

const schema = computed(() => {
  const baseSchema = {
    email: yup
      .string()
      .email('유효한 이메일을 입력해주세요')
      .required('이메일은 필수입니다'),
    password: yup
      .string()
      .min(6, '비밀번호는 최소 6자 이상이어야 합니다')
      .required('비밀번호는 필수입니다'),
  };

  if (props.mode === 'signup') {
    return yup.object({
      ...baseSchema,
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다')
        .required('비밀번호 확인은 필수입니다'),
      terms: yup
        .boolean()
        .oneOf([true], '서비스 이용을 위해 약관에 동의해주세요')
        .required('약관 동의는 필수입니다'),
    });
  }

  return yup.object(baseSchema);
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: passwordConfirm, errorMessage: passwordConfirmError } =
  useField('passwordConfirm');
const { value: terms, errorMessage: termsError } = useField(
  'terms',
  undefined,
  {
    initialValue: false,
  }
);
const { value: rememberMe } = useField('rememberMe');

const isLoading = ref(false);

onMounted(() => {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail && props.mode === 'signin') {
    email.value = rememberedEmail;
  }
});

const onSubmit = handleSubmit(async (values) => {
  try {
    if (props.mode === 'signup' && !values.terms) {
      toast.error('약관에 동의해주세요');
      return;
    }

    isLoading.value = true;
    const isValid = await validateCredentials(values.password);

    if (isValid) {
      const userData = {
        email: values.email,
        password: values.password,
      };

      if (props.mode === 'signin') {
        if (values.rememberMe) {
          localStorage.setItem('rememberedEmail', values.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('로그인 성공!');
        router.push('/');
      } else {
        // Store user data in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(userData);
        localStorage.setItem('users', JSON.stringify(users));
        toast.success('회원가입 성공!');
        emit('success', userData);
      }
    } else {
      toast.error(
        props.mode === 'signin'
          ? '로그인 실패: 잘못된 인증 정보입니다'
          : '회원가입 실패: API 키가 올바르지 않습니다'
      );
    }
  } catch (error) {
    toast.error('오류가 발생했습니다');
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="space-y-6 transition-all duration-300"
  >
    <div class="space-y-4">
      <div class="transform transition-all duration-300">
        <label class="block text-sm font-medium text-gray-300">이메일</label>
        <input
          type="email"
          v-model="email"
          class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': emailError }"
        />
        <p v-if="emailError" class="mt-1 text-sm text-red-500">
          {{ emailError }}
        </p>
      </div>

      <div class="transform transition-all duration-300">
        <label class="block text-sm font-medium text-gray-300"
          >비밀번호 {{ props.mode === 'signup' ? '(TMDB API 키)' : '' }}</label
        >
        <input
          type="password"
          v-model="password"
          class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': passwordError }"
        />
        <p v-if="passwordError" class="mt-1 text-sm text-red-500">
          {{ passwordError }}
        </p>
      </div>

      <template v-if="mode === 'signup'">
        <div class="transform transition-all duration-300">
          <label class="block text-sm font-medium text-gray-300"
            >비밀번호 확인</label
          >
          <input
            type="password"
            v-model="passwordConfirm"
            class="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': passwordConfirmError }"
          />
          <p v-if="passwordConfirmError" class="mt-1 text-sm text-red-500">
            {{ passwordConfirmError }}
          </p>
        </div>

        <div class="flex items-center transform transition-all duration-300">
          <input
            type="checkbox"
            id="terms"
            v-model="terms"
            class="rounded bg-gray-700 border-gray-600 text-blue-600 transition-colors duration-200"
            :class="{ 'border-red-500': termsError }"
          />
          <label for="terms" class="ml-2 text-sm text-gray-300"
            >서비스 이용약관에 동의합니다 (필수)</label
          >
        </div>
        <p v-if="termsError" class="mt-1 text-sm text-red-500">
          {{ termsError }}
        </p>
      </template>

      <template v-else>
        <div class="flex items-center transform transition-all duration-300">
          <input
            type="checkbox"
            id="rememberMe"
            v-model="rememberMe"
            class="rounded bg-gray-700 border-gray-600 text-blue-600 transition-colors duration-200"
          />
          <label for="rememberMe" class="ml-2 text-sm text-gray-300"
            >로그인 정보 저장</label
          >
        </div>
      </template>
    </div>

    <button
      type="submit"
      :disabled="isLoading || (mode === 'signup' && !terms)"
      class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
      :class="{ 'opacity-50 cursor-not-allowed': mode === 'signup' && !terms }"
    >
      {{ isLoading ? '처리 중...' : mode === 'signin' ? '로그인' : '회원가입' }}
    </button>
  </form>
</template>
