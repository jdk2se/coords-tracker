<template>
  <div ref="mapContainer" class="leaflet-map"></div> 
  <Button @click="isAdding = !isAdding">
    {{ isAdding ? 'x' : '+' }}
  </Button>
</template>

<script setup lang="ts">
import L from "leaflet";
import { Map } from "leaflet";
import { onMounted, Ref, ref, watch } from "vue";
import { IMarker } from "@/types/IMarker.ts";
import Button from "@/components/Button.vue";
import { TLatLng } from "@/types/TLatLng.ts";

const props = defineProps<{
  markers: IMarker[],
  activeMarker: IMarker | null,
}>();

const emits = defineEmits<{
  (e: 'mapMarkerClick', markerId: string): void,
  (e: 'mapMarkerAdded', marker: TLatLng): void,
}>();

const lat: Ref<number> = ref(0);
const lng: Ref<number> = ref(0);
const map: Ref<Map> = ref();
const isAdding: Ref<boolean> = ref(false);
const mapContainer: Ref<HTMLDivElement | null> = ref(null);
const ZOOM = 14;

onMounted(async () => {
  await getLocation();
  if (props.activeMarker) {
    map.value = L.map(mapContainer.value).setView([props.activeMarker.lat, props.activeMarker.lng], ZOOM);
  } else {
    map.value = L.map(mapContainer.value).setView([lat.value, lng.value], ZOOM);
  }

  props.markers.forEach((marker) => {
    L.marker([marker.lat, marker.lng])
      .addTo(map.value)
      .on("click", () => {
        emits('mapMarkerClick', marker.id);
      });
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: ''
  }).addTo(map.value);

  map.value.on('click', (e: TLatLng) => {
    if (!isAdding.value) return;
    
    L.marker(e.latlng).addTo(map.value);
    emits('mapMarkerAdded', e);
  });
});

const getLocation = async() => {
  const position: Awaited<Promise<GeolocationPosition>> = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }); 
  
  if (position) {
      lat.value = position.coords.latitude;
      lng.value = position.coords.longitude;
  } else {
    lat.value = 51.505;
    lng.value = -0.09;
  }
}

watch(
  () => props.activeMarker,
  () => {
    map.value.setView([props.activeMarker?.lat, props.activeMarker?.lng], ZOOM)
  }
)
</script>
