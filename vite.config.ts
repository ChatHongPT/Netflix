import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag === 'v-intersect'
        }
      }
    })
  ],
  base: '/Netflix/',
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});