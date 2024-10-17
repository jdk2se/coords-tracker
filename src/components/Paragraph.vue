<script setup lang="ts">
import { ITaskOption } from "@/types/ITaskOption.ts";

defineProps<{
  task: ITaskOption,
}>();
</script>

<template>
<article>
  <h3>{{ task.header }}</h3>
  <div v-html="task.content"></div>
</article>
</template>

<style scoped>

</style>