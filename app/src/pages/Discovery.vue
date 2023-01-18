<template>
  <div v-touch:swipe.left="like" v-touch:swipe.right="dontLike">
    <h1>Discovery</h1>
    <Player
      v-if="isLoaded && isActive"
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
          v-model="hasLiked"
        />
      </template>
    </Player>
    <div v-if="!isActive">
      <h5>{{ $t('discovery.creating') }}</h5>
    </div>
  </div>
</template>

<script setup>
import Player from "@/components/shared/music/Player.vue";
import LikeButton from "@/components/shared/buttons/LikeButton.vue";

import { onMounted, inject, ref } from "vue";
import { useRouter } from "vue-router";

import usePlayer from "@/composables/musicPlayers/playerComposable";
import { musicServiceKey, playlistServiceKey } from "@/serviceKeys";

const router = useRouter();
const musicService = inject(musicServiceKey);
const recommendationService = inject(playlistServiceKey);

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

const isActive = ref(true);
const hasLiked = ref(false);
const music = ref();
const likedTracks = ref([]);

onMounted(() => {
  next();
});

function like() {
  hasLiked.value = true;
  pause();
  console.log("like ❤️");

  likedTracks.value.push(music.value);

  if(likedTracks.value.length > 9) {
    recommendationService.getRecommendations(likedTracks.value);
    isActive.value = false;

    setTimeout(() => {
      router.push({name: "match"});
    }, 4000);
    return;
  }

  next();
}

function dontLike() {
  pause();
  console.log("don't like 💩");
  next();
}

async function next() {
  music.value = await musicService.getRandom();
  const track = await searchByMusic(music.value);
  await playTrack(track.uri);
  play();
  setTimeout(() => {
    hasLiked.value = false;
  }, 300);
}
</script>