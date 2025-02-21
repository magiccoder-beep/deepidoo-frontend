import { createApp } from 'vue';
const app = createApp(Layout);

import Router from '../javascript/admin/routes.js';
import Layout from '../javascript/admin/views/layout.vue';
import Axios from "axios";

// Pinia + Axios setup
import { createApi } from '../javascript/plugins/api';
import { createPinia } from 'pinia';
const Pinia = createPinia();
Pinia.use(({ store }) => { store.Api = createApi({handler: Axios, namespace: '/admin'}) })

// I18n loader
import { createI18n } from 'vue-i18n';
const I18n = createI18n({locale: 'current',  messages: translations, legacy: false});

app.use(Router)
   .use(Pinia)
   .use(I18n)
   .mount('#app')
