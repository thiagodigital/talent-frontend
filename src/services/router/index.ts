import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { useAuth } from '@/services/stores/authStore';

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard global
router.beforeEach((to, from, next) => {
  const auth = useAuth();

  if (to.meta.requiresGuest && auth.isAuth) {
    return next({ name: "dashboard" });
  }

  if (to.meta.requiresAuth && !auth.isAuth) {
    return next({ name: "login" });
  }

  next();
});

export default router;
