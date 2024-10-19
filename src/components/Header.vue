<template>
  <header>
    <nav>
      <router-link
        class="nav-link"
        to="/"
      >
        О задании
      </router-link>
      <router-link
        class="nav-link"
        to="/map"
      >
        Карта
      </router-link>    
    </nav>
    <span class="material-symbols-outlined">language</span>  
  </header>
  <Preloader />
</template>

<script setup lang="ts">
import Preloader from "@/components/Preloader.vue";
</script>

<style scoped>

</style>