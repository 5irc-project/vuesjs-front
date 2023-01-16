<template>
  <div v-touch:swipe.left="like" v-touch:swipe.right="dontLike">
    <h1>Discovery</h1>
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
          icon="pi pi-times"
          class="p-button-rounded p-button-text p-button-danger"
          @click="dontLike"
          style="width: 60px; height: 60px;"
        />
        <Button
          @click="togglePlay"
          :icon="`pi ${playIcon}`"
          class="p-button-rounded p-button-action p-button-main"
        />
        <LikeButton
          @click="like"
        />
      </template>
    </Player>
  </div>
</template>

<script setup>
import { onMounted, inject } from "vue";
import Player from "@/components/shared/music/Player.vue";
import LikeButton from "@/components/shared/buttons/LikeButton.vue";

import usePlayer from "@/composables/musicPlayers/playerComposable";
import { musicServiceKey } from "@/serviceKeys";

const musicService = inject(musicServiceKey);


const {
  isLoaded,
  artists,
  title,
  img,
  position,
  duration,
  playIcon,
  playTrack,
  searchByMusic,
  togglePlay,
  pause,
  play
} = usePlayer();

onMounted(() => {
  next();
})

function like() {
  console.log("like ❤️");
  next();
}

function dontLike() {
  console.log("don't like 💩");
  next();
}

async function next() {
  pause();
  const music = await musicService.getRandom();
  const track = await searchByMusic(music);
  await playTrack(track.uri);
  play();
}
</script>