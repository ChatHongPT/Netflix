import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import TrendingContent from '../views/TrendingContent.vue'
import Browse from '../views/Browse.vue'
import MyList from '../views/MyList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'auth',
      component: Auth
    },
    {
      path: '/trending',
      name: 'trending',
      component: TrendingContent,
      meta: { requiresAuth: true }
    },
    {
      path: '/browse',
      name: 'browse',
      component: Browse,
      meta: { requiresAuth: true }
    },
    {
      path: '/my-list',
      name: 'myList',
      component: MyList,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, _, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router