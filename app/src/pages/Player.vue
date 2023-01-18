<template>
  <div class="page">
    <div class="player__header">
      <Button
        icon="pi pi-angle-left"
        class="p-button-rounded p-button-text p-button-lg"
        @click="previous"
      />
      <i class="b-list__item__action pi pi-ellipsis-v" @click="openSidebar" />
    </div>
    <MusicPlayer>
      <template v-slot:tools>
        <Button
          :icon="`pi ${isFavorite ? 'pi-star-fill' : 'pi-star'}`"
          class="p-button-rounded p-button-warning p-button-text"
          @click="toggleFavorite"
        />
      </template>
    </MusicPlayer>

    <Sidebar
      v-model:visible="sidebar"
      :baseZIndex="10000"
      position="bottom"
      class="sidebar"
    >
      <h3>{{ $t("shared.options") }}</h3>
      <Button
        @click="addToAPlaylist"
        :label="$t('music.addToAPlaylist')"
        icon="pi pi-plus"
        class="p-button-success"
      />
      <Button
        @click="addToFav"
        :label="$t('music.addToFav')"
        icon="pi pi-star"
        class="p-button-help"
        :disabled="isFavorite"
      />
    </Sidebar>

    <Sidebar
      v-model:visible="sidebarAddToPlaylist"
      :baseZIndex="10001"
      position="full"
      class="sidebar"
    >
      <h3>{{ $t("music.pickPlaylist") }}</h3>
      <List style="height: 100%">
        <Item
          v-for="playlist in playlists"
          :key="playlist.playlistId"
          :imageSrc="playlist.imageSrc"
          :title="playlist.playlistName"
          :description="playlist.description"
          @click="addToPlaylist(playlist)"
        />
        <Button
          @click="openCreatePlaylist"
          :label="$t('playlist.create')"
          icon="pi pi-plus"
          class="p-button-success"
        />
      </List>
    </Sidebar>

    <CreatePlaylist v-model="sidebarCreatePlaylist" @close="updatePlaylists" />
  </div>
</template>

<script setup>
import List from "@/components/shared/list/List.vue";
import Item from "@/components/shared/list/Item.vue";
import MusicPlayer from "@/components/shared/music/MusicPlayer";
import CreatePlaylist from "@/components/shared/playlist/CreatePlaylist.vue";

import { ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  musicServiceKey,
  musicPlayerStoreKey,
  playlistServiceKey,
} from "@/serviceKeys";

const route = useRoute();
const router = useRouter();
const musicService = inject(musicServiceKey);
const musicPlayerStore = inject(musicPlayerStoreKey);
const musicPlayerService = musicPlayerStore.getService;
const playlistService = inject(playlistServiceKey);

var music = ref({});
const sidebar = ref(false);

musicService.getById(route.params.id).then(async (m) => {
  music.value = m;

  updateIsFavorite();
  const toPlay = await musicPlayerService.search(
    music.value.trackName + " " + music.value.artistName
  );
  await musicPlayerService.playTrack(toPlay.uri);
});

function previous() {
  if (musicPlayerService.hasCurrentPlaylist) {
    return router.push({
      name: "playlist",
      params: {
        id: musicPlayerService.getCurrentPlaylist.playlistId,
      },
    });
  }

  router.back();
}

function openSidebar() {
  sidebar.value = true;
}
function closeSidebar() {
  sidebar.value = false;
}

function addToAPlaylist() {
  sidebarAddToPlaylist.value = true;
  closeSidebar();
  updatePlaylists();
}

const sidebarAddToPlaylist = ref(false);
const playlists = ref([]);

async function updatePlaylists() {
  playlists.value = await playlistService.getAvailablePlaylists(
    music.value.trackId
  );
}

async function addToPlaylist(playlist) {
  await playlistService.addTrackFromPlaylist(playlist, music.value);
  sidebarAddToPlaylist.value = false;
  updateIsFavorite();
}

const sidebarCreatePlaylist = ref(false);

function openCreatePlaylist() {
  sidebarCreatePlaylist.value = true;
}

const isFavorite = ref(false);
async function updateIsFavorite() {
  if (!musicPlayerStore.hasCurrentMusic) {
    return;
  }

  const music = musicPlayerStore.getCurrentMusic;
  isFavorite.value = await musicService.isInFavorite(music);
}


async function addToFav() {
  await playlistService.addToFavorite(music.value);
  await updateIsFavorite();
}

async function toggleFavorite() {
  await updateIsFavorite();

  if(isFavorite.value) {
    await playlistService.removeFromFavorite(music.value);
  } else {
    await playlistService.addToFavorite(music.value);
  }

  await updateIsFavorite();
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
    margin: 0.25rem 0;
  }
}
</style>