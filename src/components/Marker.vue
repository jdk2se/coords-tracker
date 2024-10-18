<script setup lang="ts">
import { IMarker } from "@/types/IMarker.ts";

defineProps<{
  marker: IMarker,
}>();
</script>

<template>
  <div class="marker">
    <div class="marker__title">
      Марке № {{ marker.id }}
    </div>
    <div class="marker__coords">
      {{ marker.lat }}, {{ marker.lng }}
    </div>
  </div>
</template>

