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
import Player from "@/components/shared/music/Player.vue";
import LikeButton from "@/components/shared/buttons/LikeButton.vue";
import usePlayer from "@/composables/musicPlayers/playerComposable";

const {
  isLoaded,
  artists,
  title,
  img,
  position,
  duration,
  playIcon,
  togglePlay,
} = usePlayer();

function like() {
  console.log("like ❤️");
}

function dontLike() {
  console.log("don't like 💩");
}
</script>