import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import TrendingContent from '../views/TrendingContent.vue'
import Browse from '../views/Browse.vue'
import MyList from '../views/MyList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/trending',
      name: 'trending',
      component: TrendingContent
    },
    {
      path: '/browse',
      name: 'browse',
      component: Browse
    },
    {
      path: '/my-list',
      name: 'myList',
      component: MyList
    }
  ]
})

export default router