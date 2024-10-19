<template>
  <div class="dropdown">
    <span class="material-symbols-outlined">language</span>
    <div class="dropdown-content">
      <a href="#" @click="$i18n.locale='ru'">RU</a>
      <a href="#" @click="$i18n.locale='en'">EN</a>
    </div>
  </div>
  <select class="dropdown-touch">
    <option value="ru" @click="$i18n.locale='ru'" selected>RU</option>
    <option value="en" @click="$i18n.locale='en'">EN</option>
  </select>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.dropbtn {
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown-touch {
  display: none;
}

@media (max-width: 960px) {
  .dropdown {
    display: none;
  }

  .dropdown-touch {
    display: inline-block;
  }
}
</style>