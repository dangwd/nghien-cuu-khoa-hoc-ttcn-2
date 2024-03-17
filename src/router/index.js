import { createRouter, createWebHistory } from 'vue-router'
import masterView from '../views/layout/masterView.vue'
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/authen/login/index.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/authen/signup/index.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/dashboard/master/index.vue'),
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      children: [
        {
          name: 'User',
          path: '/user-account',
          component: () => import('../views/dashboard/user/index.vue')
        },
        {
          name: 'Document',
          path: '/document-manage',
          component: () => import('../views/dashboard/document/index.vue')
        }, {
          name: 'Post',
          path: '/post-manage',
          component: () => import('../views/dashboard/posts/index.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'masterView',
      component: masterView,
      redirect: '/homepage',
      meta: { requiresAuth: true },
      children: [
        {
          name: 'Homepage',
          path: '/homepage',
          component: () => import('../views/HomeView.vue'),

        },
        {
          name: 'document',
          path: '/document',
          component: () => import('../views/DocumentView.vue'),
        },
        {
          name: 'detail-post',
          path: '/detail-post/:id',
          component: () => import('../views/DetailPost.vue')
        },
        {
          name: 'introduce',
          path: '/introduce',
          component: () => import('../views/IntroduceView.vue')
        },
        {
          name: 'news',
          path: '/news',
          component: () => import('../views/NewsView.vue')
        },
        {
          name: 'notification',
          path: '/notification',
          component: () => import('../views/NotiView.vue')
        },
        {
          name: 'Info',
          path: '/user-info',
          component: () => import('../views/info/index.vue')
        },

      ]
    },

  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.token === null) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router