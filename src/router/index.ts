import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { name: 'Home', path: '/', meta: { layout: 'default' }, component: () => import('@pages/Home.vue') },
  { name: 'Not Found', path: '/:pathMatch(.*)*', meta: { layout: 'default' }, component: () => import('@pages/errors/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to: any) => {
  document.title = `${import.meta.env.VITE_APP_NAME}: ${String(to.name)}`
})

export default router
