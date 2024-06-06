import { createWebHistory, createRouter } from 'vue-router'

import TicketIndex from './views/tickets/index.vue';
import UserIndex from './views/users/index.vue';
import UserShow from './views/users/show.vue';

const router = createRouter({
  history: createWebHistory(`/${I18n.prefix}admin`),
  routes: [
    { path: '/', component: TicketIndex, name: 'home' }, 
    { path: '/users', component: UserIndex, name: 'users' },
    { path: '/users/:id', component: UserShow, name: 'user' }
  ]
});

// Handles 404 Not found
router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    window.location.href = '/404'
  } else {
    next();
  }
});

export default router;