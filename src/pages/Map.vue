<template>
  <div class="map-wrapper"> 
    <section class="markers">
      <p class="markers__title">Маркеры:</p>
      <div class="markers__list">
        <Marker
          v-for="marker in markerStore.markers"
          :marker="marker"
          :is-active="isMarkerActive(marker.id)"
          :key="marker.id"
          @marker-click="setActiveMarker"
        />
      </div>
    </section>
    <section class="map-container">
      <Map 
        :markers="markerStore.markers"
        :active-marker="activeMarker"
        @map-marker-click="setActiveMarker"
        @map-marker-added="markerStore.addMarker"
      />        
    </section>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import Marker from "@/components/Marker.vue";
import { useMarkerStore } from "@/stores/markerStore.ts";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const markerStore = useMarkerStore();
const { activeMarker } = storeToRefs(markerStore);
const router = useRouter();

const isMarkerActive = (id: string) => {
  if (!activeMarker.value) return false;
  
  return id === activeMarker.value.id;
}

const setActiveMarker = (id: string) => {
  router.replace({
    name: 'map-view',
    params: {
      markerId: id,
    },
  });
  
  markerStore.setActiveMarker(id);
}
</script>
