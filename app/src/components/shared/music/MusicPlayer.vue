<template>
  <Player v-if="isLoaded" :img="img" :title="title" :artist="artist" :duration="duration" v-model="position">
    <template v-slot:actions>
      <Button icon="pi pi-filter-slash" class="p-button-rounded p-button-action" />
      <Button @click="previousTrack" icon="pi pi-step-backward" class="p-button-rounded p-button-action" />
      <Button @click="togglePlay" :icon="`pi ${playIcon}`" class="p-button-rounded p-button-action p-button-main" />
      <Button @click="nextTrack" icon="pi pi-step-forward" class="p-button-rounded p-button-action" />
      <Button icon="pi pi-sync" class="p-button-rounded p-button-action" />
    </template>
  </Player>
</template>

<script setup>
import Player from "@/components/shared/music/Player.vue";
import { computed, inject, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from 'pinia'
import { musicPlayerStoreKey } from "@/serviceKeys";

const musicPlayerStore = inject(musicPlayerStoreKey);
const musicService = musicPlayerStore.getService;

const { musicState } = storeToRefs(musicPlayerStore);

const isLoaded = computed(() => {
  return musicState.value.context != null;
})

const artist = computed(() => {
  return musicState.value.context.metadata.current_item.artists.reduce((string, newArtist) => string += (string != "" ? `, ${newArtist.name}` : newArtist.name), "");
})

const title = computed(() => {
  return musicState.value.context.metadata.current_item.name;
})

const img = computed(() => {
  return musicState.value.context.metadata.current_item.images[2].url;
})

const position = computed(() => {
  return musicState.value.position;
})

const duration = computed(() => {
  return musicState.value.duration;
})

const playIcon = computed(() => {
  return !musicState.value.paused ? 'pi-pause' : 'pi-caret-right';
});

async function togglePlay() {
  await musicService.togglePlay();
}

async function previousTrack() {
  await musicService.previousTrack();
}

async function nextTrack() {
  await musicService.nextTrack();
}

// eslint-disable-next-line
let timeInterval;

onMounted(() => {
  timeInterval = setInterval(() => {
    if (musicState.value.paused)
      return;

    musicState.value.position += 1000;
  }, 1000);
})

onBeforeUnmount(() => {
  clearInterval(timeInterval);
})
</script>