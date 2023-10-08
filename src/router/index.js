import { createRouter, createWebHistory } from 'vue-router';
import { computed, ref } from 'vue';
import store from '@/store';
import { ROUTER_DATA } from '@/constants';

const isAuth = ref(computed(() => store.getters['authUser/isAuthorized']));

const routes = [
  {
    path: '',
    component: () => import('@/components/NavbarComponent'),
    children: [
      ...ROUTER_DATA.map(({ path, pathToComponent, meta }) => {
        return {
          path,
          component: () => import(`@/${pathToComponent}`),
          meta: meta ? meta : {},
        };
      })
    ]
  }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/' || to.fullPath === '/about') {
        next()
    } else if (to.meta.requiresAuth && !isAuth.value) {
        next('authorization')
    } else if (!to.meta.requiresAuth && isAuth.value) {
        next('/')
    } else {
        next()
    }
});

export default router;
