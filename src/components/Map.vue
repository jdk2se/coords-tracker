<template>
  <div ref="mapContainer" class="leaflet-map"></div> 
  <Button @click="isAdding = !isAdding">
    {{ isAdding ? 'x' : '+' }}
  </Button>
  <p class="warning" v-show="isWrongMarker">{{ $t('markers.incorrectAddress') }}</p>
</template>

<script setup lang="ts">
import L from "leaflet";
import { Map } from "leaflet";
import { onMounted, Ref, ref, watch } from "vue";
import { IMarker } from "@/types/IMarker.ts";
import Button from "@/components/UI/Button.vue";
import { TLatLng } from "@/types/TLatLng.ts";
import { useMarkerStore } from "@/stores/markerStore.ts";

const props = defineProps<{
  markers: IMarker[],
  activeMarker: IMarker | null,
}>();

const emits = defineEmits<{
  (e: 'mapMarkerClick', markerId: string): void,
}>();

const lat: Ref<number> = ref(0);
const lng: Ref<number> = ref(0);
let map: Map;
const isAdding: Ref<boolean> = ref(false);
const mapContainer: Ref<HTMLDivElement | string> = ref('');
const ZOOM = 14;
const { addMarker } = useMarkerStore();
const isWrongMarker: Ref<boolean> = ref(false);

onMounted(async () => {
  await getLocation();
  if (props.activeMarker) {
    map = L.map(mapContainer.value).setView([props.activeMarker.lat, props.activeMarker.lng], ZOOM);
  } else {
    map = L.map(mapContainer.value).setView([lat.value, lng.value], ZOOM);
  }

  props.markers.forEach((marker) => {
    L.marker([marker.lat, marker.lng])
      .addTo(map)
      .on("click", () => {
        isWrongMarker.value = false;
        emits('mapMarkerClick', marker.id);
      });
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: ''
  }).addTo(map);

  map.on('click', async (e: TLatLng) => {
    if (!isAdding.value) return;

    const markerId = await addMarker(e);
    if (markerId) {
      L.marker(e.latlng)
        .addTo(map)
        .on("click", () => {
          isWrongMarker.value = false;
          emits('mapMarkerClick', markerId);
        })
      ;
      isWrongMarker.value = false;
    } else {
      isWrongMarker.value = true;
    }    
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
    if (map && props.activeMarker) {
      map.setView([props.activeMarker.lat, props.activeMarker.lng], ZOOM)  
    }    
  }
)
</script>
