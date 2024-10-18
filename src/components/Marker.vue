<script setup lang="ts">
import { IMarker } from "@/types/IMarker.ts";

defineProps<{
  marker: IMarker,
  isActive: boolean,
}>();
</script>

<template>
  <div 
    class="marker"
    :class="{ active: isActive }"
    @click="$emit('marker-click', marker.id)"
  >
    <div class="marker__title">
      Маркер № {{ marker.id }}
    </div>
    <div class="marker__coords">
      {{ marker.lat }}, {{ marker.lng }}
    </div>
  </div>
</template>

