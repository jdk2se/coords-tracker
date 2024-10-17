<script setup lang="ts">
import Header from "@/components/Header.vue";
import { onBeforeMount } from "vue";

onBeforeMount(() => {
  console.log('Load data');
});
</script>

<template>
  <Header /> 
  <div class="content">
    <router-view />
  </div>
</template>

