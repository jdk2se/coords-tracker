<template>
  <div class="map-wrapper">
    <section class="markers">
      <p class="markers__title">Маркеры:</p>
      <Marker
        v-for="marker in markers"
        :marker="marker"
        :key="marker.id"
      />
    </section>
    <section class="map-container">
      <Map />        
    </section>
  </div>
</template>

<script setup lang="ts">
import Map from "@/components/Map.vue";
import Marker from "@/components/Marker.vue";
import { useMarkerStore } from "@/stores/markerStore.ts";

const markers = useMarkerStore().markers;
</script>
