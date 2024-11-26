import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/Netflix/', // GitHub Pages에서 서브 디렉토리를 사용할 경우
});
