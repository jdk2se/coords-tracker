import Home from "@/pages/Home.vue";
import Map from "@/pages/Map.vue";
import NotFound from "@/pages/NotFound.vue";

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/map',
    component: Map,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
  }
];