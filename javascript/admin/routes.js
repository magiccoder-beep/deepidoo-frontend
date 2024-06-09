import { createWebHistory, createRouter } from 'vue-router'

import TicketIndex from './views/tickets/index.vue';
import UserIndex from './views/users/index.vue';
import UserShow from './views/users/show.vue';

import ContactIndex from './views/contacts/index.vue';
import ContactNew from './views/contacts/new.vue';
import ContactEdit from './views/contacts/edit.vue';

import ClientIndex from './views/clients/index.vue';
import ClientEdit from './views/clients/edit.vue';
import ClientNew from './views/clients/new.vue';
import { urls } from '../const/const';

import MusicIndex from './views/music/index.vue';
import * as MUSIC_CONSTS from '../const/music';

import DeviceIndex from './views/devices/index.vue';
import * as DEVICE_CONSTS from '../const/device';

const users = urls.users.frontend;
const contacts = urls.contacts.frontend;
const clients = urls.clients.frontend;

const router = createRouter({
  history: createWebHistory(`/${I18n.prefix}admin`),
  routes: [
    { path: '/', component: TicketIndex, name: 'home' },
    { path: users.url.index, component: UserIndex, name: users.name.index },
    { path: users.url.edit, component: UserShow, name: users.name.edit },

    { path: contacts.url.index, component: ContactIndex, name: contacts.name.index },
    { path: contacts.url.new, component: ContactNew, name: contacts.name.new },
    { path: contacts.url.edit, component: ContactEdit, name: contacts.name.edit },

    { path: clients.url.index, component: ClientIndex, name: clients.name.index },
    { path: clients.url.new, component: ClientNew, name: clients.name.new },
    { path: clients.url.edit, component: ClientEdit, name: clients.name.edit },

    { path: MUSIC_CONSTS.ROUTES.INDEX.URL, component: MusicIndex, name: MUSIC_CONSTS.ROUTES.INDEX.NAME },

    { path: DEVICE_CONSTS.ROUTES.INDEX.URL, component: DeviceIndex, name: DEVICE_CONSTS.ROUTES.INDEX.NAME }

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