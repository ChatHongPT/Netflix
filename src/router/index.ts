import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignIn from '../views/SignIn.vue'
import TrendingContent from '../views/TrendingContent.vue'
import Browse from '../views/Browse.vue'
import MyList from '../views/MyList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
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

router.beforeEach((to, _from, next) => {
  const isAuthenticated = localStorage.getItem('user')
  
  if (to.path === '/' && !isAuthenticated) {
    next('/signin')
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin')
  } else if (to.path === '/signin' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router