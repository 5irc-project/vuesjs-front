<template>
  <div class="layout-main">
    <div class="layout">
      <router-view />

      <AppMenu />
      <SpotifyMinifiedPlayer></SpotifyMinifiedPlayer>
    </div>
  </div>
</template>

<script setup>
import AppMenu from './AppMenu.vue'
import SpotifyMinifiedPlayer from "@/components/musicPlayers/spotify/SpotifyMinifedPlayer";
</script>