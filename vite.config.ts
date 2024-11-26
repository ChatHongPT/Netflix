import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';

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