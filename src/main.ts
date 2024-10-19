import { createApp } from 'vue'
import './styles.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from "vue-i18n";

import { routes } from '@/routes.ts';
import config from '@/i18n/config';

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const i18n = createI18n(config)

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount('#app')