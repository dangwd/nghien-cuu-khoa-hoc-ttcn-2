import { createRouter, createWebHistory } from 'vue-router'
import masterView from '../views/layout/masterView.vue'
import store from '@/store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth"
    }
  },
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
      path: '/forgot-pass',
      name: 'ForgotPass',
      component: () => import('../views/authen/forgetpass/index.vue')
    },
    {
      path: '/no-login',
      name: 'NoLogin',
      component: () => import('../views/nologin/index.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/dashboard/master/index.vue'),
      meta: { requiresAuth: true, role: 'ROLE_ADMIN' },
      children: [
        {
          name: 'Test',
          path: '/users-manager',
          component: () => import('../views/dashboard/users/index.vue')
        },
        {
          name: 'Document',
          path: '/document-manage',
          component: () => import('../views/dashboard/document/index.vue')
        },
        {
          name: 'Post',
          path: '/post-manage',
          component: () => import('../views/dashboard/post/index.vue')
        },
        {
          name: 'Category',
          path: '/category',
          component: () => import('../views/dashboard/category/index.vue')
        },
        {
          name: 'Noti',
          path: '/noti',
          component: () => import('../views/dashboard/noti/index.vue')
        },

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
          name: 'detail-cate',
          path: '/detail-cate/:id',
          component: () => import('../views/DetailCategory.vue')
        },
        {
          name: 'detail-documents',
          path: '/detail-documents/:id',
          component: () => import('../views/DetailDocuments.vue')
        },
        {
          name: 'detail-toptier',
          path: '/detail-toptier/:id',
          component: () => import('../views/PostTopTier.vue')
        },
        {
          name: 'saved-documents',
          path: '/saved-documents',
          component: () => import('../views/SavedDoc.vue')
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
        {
          name: 'Search',
          path: '/search',
          component: () => import('../views/search/index.vue')
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
      const vuexData = JSON.parse(localStorage.getItem('vuex'));
      const userRole = vuexData.user.role;
      if (to.meta.role && userRole !== to.meta.role) {
        next({ name: 'Homepage' });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});

export default router
