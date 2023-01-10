<template>
  <div class="page">
    {{ userStore.getUser.display_name }}

    <MusicPlayer></MusicPlayer>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { userStoreKey } from "@/serviceKeys";
import MusicPlayer from "../components/shared/music/MusicPlayer.vue";

const userStore = inject(userStoreKey);
</script>