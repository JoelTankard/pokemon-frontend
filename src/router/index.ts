import { createRouter, createWebHistory } from 'vue-router'
import Join from '../views/Join.vue'
import Host from '../views/Host.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'join',
      component: Join
    },
    {
      path: '/host',
      name: 'host',
      component: Host
    },
  ]
})

export default router
