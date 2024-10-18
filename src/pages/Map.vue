<template>
  <div class="map-wrapper">
    <section class="markers">
      <p class="markers__title">Маркеры:</p>
      <Marker
        v-for="marker in markers"
        :marker="marker"
        :is-active="isMarkerActive(marker.id)"
        :key="marker.id"
        @marker-click="markerClick"
      />
    </section>
    <section class="map-container">
      <Map 
        :markers="markers"
        :active-marker="activeMarker"
        @map-marker-click="markerClick"
      />        
    </section>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import Marker from "@/components/Marker.vue";
import { useMarkerStore } from "@/stores/markerStore.ts";

const { markers, activeMarker } = useMarkerStore();

const isMarkerActive = (id: string) => {
  if (!activeMarker) return false;
  
  return id === activeMarker.id;
} 

const markerClick = (id: string) => {
  console.log(id);// @TODO DudnikES
};
</script>
