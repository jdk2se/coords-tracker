<template>
  <div ref="mapContainer" class="leaflet-map"></div>
  {{ lat }} : {{ lng }}
</template>

<script setup lang="ts">
import L from "leaflet";
import { Map } from "leaflet";
import { onMounted, Ref, ref } from "vue";
import { useMarkerStore } from "@/stores/markerStore.ts";

const lat: Ref<number> = ref(0);
const lng: Ref<number> = ref(0);
const map: Ref<Map> = ref();
const mapContainer: Ref<HTMLDivElement | null> = ref(null);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      map.value.setView([lat.value, lng.value], 16);

      L.marker([lat.value, lng.value],{draggable : true})
        .addTo(map.value)
        .on("dragend",(event)=> {
          console.log(event)
        });
    })
  }
}

onMounted(() => {
  getLocation();
  
  map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);  
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ''
  }).addTo(map.value);
});
</script>
