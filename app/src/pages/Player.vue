<template>
  <div class="page">
    <div class="player__header">
      <Button icon="pi pi-angle-left" class="p-button-rounded p-button-text p-button-lg" @click="previous" />
      <i class="b-list__item__action pi pi-ellipsis-v" @click="openSidebar" />
    </div>
    <MusicPlayer />

    <Sidebar v-model:visible="sidebar" :baseZIndex="10000" position="bottom" class="sidebar">
      <h3>{{ $t('shared.options') }}</h3>
      <Button @click="addToAPlaylist" :label="$t('music.addToAPlaylist')" icon="pi pi-plus" class="p-button-success" />
      <Button @click="addToFav" :label="$t('music.addToFav')" icon="pi pi-star" class="p-button-help" />
    </Sidebar>
  </div>
</template>

<script setup>
import MusicPlayer from "@/components/shared/music/MusicPlayer";

import { ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { musicServiceKey, musicPlayerStoreKey } from "@/serviceKeys";

const route = useRoute();
const router = useRouter();
const musicService = inject(musicServiceKey);
const musicPlayerStore = inject(musicPlayerStoreKey);
const musicPlayerService = musicPlayerStore.getService;

var music = ref({});
const sidebar = ref(false);

musicService.getById(route.params.id).then(async (m) => {
  music.value = m;

  const toPlay = await musicPlayerService.search(music.value.trackName + " " + music.value.artistName);
  await musicPlayerService.playTrack(toPlay.uri);
});


function previous() {
  if (musicPlayerService.hasCurrentPlaylist) {
    return router.push({
      name: "playlist", params: {
        id: musicPlayerService.getCurrentPlaylist.playlistId
      }
    });
  }

  router.back();
}

function openSidebar() {
  sidebar.value = true;
}

function addToAPlaylist() {
  
}

function addToFav() {

}
</script> 

<style lang="scss">
.player__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .p-button.p-button-lg {
    padding: 0;
    margin: 0;
    width: auto;

    .p-button-icon {
      font-size: 1.75rem;
    }
  }
}

.sidebar {
  button {
    width: 100%;
    margin: .25rem 0;
  }
}
</style>