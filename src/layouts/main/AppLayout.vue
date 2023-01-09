<template>
  <div class="layout-main">
    <div class="layout">
      <router-view />
      <AppMenu />
    </div>
  </div>
</template>

<script setup>
import AppMenu from './AppMenu.vue'

</script>