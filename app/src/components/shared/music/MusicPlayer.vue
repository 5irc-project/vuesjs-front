<template>
  <Player
    v-if="isLoaded"
    :img="img"
    :title="title"
    :artist="artists"
    :duration="duration"
    v-model="position"
  >
    <template v-slot:tools>
      <slot name="tools"></slot>
    </template>
    <template v-slot:actions>
      <Button
        icon="pi pi-filter-slash"
        class="p-button-rounded p-button-action"
        @click="toggleShuffleMode"
      >
        <i v-if="isShuffleMode" id="repeatMode" class="pi pi-filter-slash" v-badge.danger></i>
      </Button>
      <Button
        @click="previousTrack"
        icon="pi pi-step-backward"
        class="p-button-rounded p-button-action"
      />
      <Button
        @click="togglePlay"
        :icon="`pi ${playIcon}`"
        class="p-button-rounded p-button-action p-button-main"
      />
      <Button
        @click="nextTrack"
        icon="pi pi-step-forward"
        class="p-button-rounded p-button-action"
      />
      <Button icon="pi pi-sync" class="p-button-rounded p-button-action" @click="toggleRepeatMode">
        <i v-if="isRepeatMode" id="repeatMode" class="pi pi-sync" v-badge.danger></i>
      </Button>
    </template>
  </Player>
</template>

<script setup>
import Player from "@/components/shared/music/Player.vue";
import usePlayer from "@/composables/musicPlayers/playerComposable";

import { musicPlayerStoreKey } from "@/serviceKeys";
import { computed, inject } from "vue";

const musicPlayerStore = inject(musicPlayerStoreKey);

const isRepeatMode = computed(() => {
  return musicPlayerStore.isRepeatMode;
});
const isShuffleMode = computed(() => {
  return musicPlayerStore.isShuffleMode;
});

function toggleRepeatMode() {
  musicPlayerStore.toggleRepeatMode();
}
function toggleShuffleMode() {
  musicPlayerStore.toggleShuffleMode();
}

const { isLoaded, artists, title, img, position, duration, playIcon, togglePlay, previousTrack, nextTrack } = usePlayer();
</script>

<style lang="scss">
#repeatMode {
  span {
    min-width: .75rem !important;
    height: .75rem !important;
  }
}
</style>