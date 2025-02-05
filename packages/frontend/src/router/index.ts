import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '@/router/routes.ts';

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
