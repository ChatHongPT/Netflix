import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import Browse from '../views/Search.vue';
import MyList from '../views/MyList.vue';
import Trending from '../views/Trending.vue';

const router = createRouter({
  history: createWebHistory('/Netflix'),
  routes: [
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/popular',
      name: 'trending',
      component: Trending,
      meta: { requiresAuth: true },
    },
    {
      path: '/search',
      name: 'browse',
      component: Browse,
      meta: { requiresAuth: true },
    },
    {
      path: '/wishlist',
      name: 'myList',
      component: MyList,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = localStorage.getItem('user');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router;