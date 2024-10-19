<template>
  <header>
    <nav>
      <router-link
        class="nav-link"
        to="/"
      >
        {{ $t('header.about') }}
      </router-link>
      <router-link
        class="nav-link"
        to="/map"
      >
        {{ $t('header.map') }}
      </router-link>    
    </nav>    
    <DropdownMenu />
  </header>
  <Preloader />
</template>

<script setup lang="ts">
import Preloader from "@/components/UI/Preloader.vue";
import DropdownMenu from "@/components/UI/DropdownMenu.vue";
</script>

<style scoped>

</style>