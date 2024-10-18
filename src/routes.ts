import Home from "@/pages/Home.vue";
import Map from "@/pages/Map.vue";
import NotFound from "@/pages/NotFound.vue";
import { useMarkerStore } from "./stores/markerStore.ts";

export const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/map/:markerId?',
    beforeEnter: async (to) => {      
      await useMarkerStore().fill(to.params.markerId);
      return true;
    },
    component: Map,
    props: true,
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
  }
];