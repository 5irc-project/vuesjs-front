<template>
  <Player
    v-if="isLoaded"
    :img="img"
    :title="title"
    :artist="artists"
    :duration="duration"
    v-model="position"
  >
    <template v-slot:actions>
      <Button
        icon="pi pi-filter-slash"
        class="p-button-rounded p-button-action"
      />
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
      <Button icon="pi pi-sync" class="p-button-rounded p-button-action" />
    </template>
  </Player>
</template>

<script setup>
import Player from "@/components/shared/music/Player.vue";
import usePlayer from "@/composables/musicPlayers/playerComposable";

const { isLoaded, artists, title, img, position, duration, playIcon, togglePlay, previousTrack, nextTrack } = usePlayer();
</script>