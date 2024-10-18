<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>

<template>
  <Header /> 
  <div class="content">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

