<template>
  <div ref="mapContainer" class="leaflet-map"></div>
  {{ lat }} : {{ lng }}
</template>

<script setup lang="ts">
import L from "leaflet";
import { Map } from "leaflet";
import { onMounted, Ref, ref } from "vue";
import { IMarker } from "@/types/IMarker.ts";

const props = defineProps<{
  markers: IMarker[],
  activeMarker: IMarker | null,
}>();

const emits = defineEmits<{
  (e: 'mapMarkerClick', markerId: string): void
}>();

const lat: Ref<number> = ref(0);
const lng: Ref<number> = ref(0);
const map: Ref<Map> = ref();
const mapContainer: Ref<HTMLDivElement | null> = ref(null);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
      // map.value.setView([lat.value, lng.value], 15);
      
      props.markers.forEach((marker) => {
        L.marker([marker.lat, marker.lng])
          .addTo(map.value)
          .on("click", () => {
            emits('mapMarkerClick', marker.id);
          })
      });
    })
  }
}

onMounted(() => {
  getLocation();
  if (props.activeMarker) {
    map.value = L.map(mapContainer.value).setView([props.activeMarker.lat, props.activeMarker.lng], 15);
  } else {
    map.value = L.map(mapContainer.value).setView([51.505, -0.09], 13);  
  }
    
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ''
  }).addTo(map.value);
});
</script>
