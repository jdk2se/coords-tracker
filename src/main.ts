import { createApp } from 'vue'
import './styles.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/routes.ts';

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')