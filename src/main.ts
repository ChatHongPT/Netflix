import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { intersectionObserver } from './directives/intersection-observer'

const app = createApp(App)
app.use(router)
app.use(Toast)
app.directive('intersection-observer', intersectionObserver)
app.mount('#app')