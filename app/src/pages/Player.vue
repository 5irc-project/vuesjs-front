<template>
  <div class="page">
    <MusicPlayer></MusicPlayer>
  </div>
</template>

<script setup>
import MusicPlayer from "@/components/shared/music/MusicPlayer";

import { ref, inject } from "vue";
import { useRoute } from "vue-router";
import { musicServiceKey, musicPlayerStoreKey } from "@/serviceKeys";

const route = useRoute();
const musicService = inject(musicServiceKey);
const musicPlayerStore = inject(musicPlayerStoreKey);
const musicPlayerService = musicPlayerStore.getService;

var music = ref({});

musicService.getById(route.params.id).then(async (m) => {
  music.value = m;

  const toPlay = await musicPlayerService.search(music.value.trackName + " " + music.value.artistName);
  await musicPlayerService.playTrack(toPlay.uri);
});
</script> 