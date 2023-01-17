<template>
  <div class="page">
    <div class="page__header">
      <img :src="playlist.imageSrc" />
      <div class="page__header-informations">
        <h1>{{ playlist.playlistName }}</h1>
        <Button
          v-if="playlist.isGenerated"
          type="button"
          :label="$t('playlist.validate')"
          icon="pi pi-check"
          class="p-button-secondary"
          badge=" "
          badgeClass="p-badge-danger"
          @click="validate"
        />
        <div class="page__header-informations__filters">
          <Button icon="pi pi-sort-alpha-down" class="p-button-rounded p-button-outlined" @click="sortArtistName" />
          <Button icon="pi pi-sort-alpha-down" class="p-button-rounded p-button-outlined" @click="sortGenre" />
          <Button icon="pi pi-sort-alpha-down" class="p-button-rounded p-button-outlined" @click="sortTrackName" />
        </div>
      </div>
    </div>
    <div class="page__playlists">
      <SearchBar placeholder="Search a music" />
    </div>
    <List>
      <Item
        v-for="music in playlist.tracks"
        :key="music.trackId"
        :title="music.trackName"
        :description="music.artistName"
        @clickItem="play(music)"
        @clickAction="openSideMenu(music)"
      >
      </Item>
    </List>
    <Sidebar v-model:visible="sidebar" :baseZIndex="10000" position="bottom" class="sidebar">
      <h3>{{ $t('shared.options') }}</h3>
      <Button @click="removeFromPlaylist" :label="$t('music.delete')" icon="pi pi-times" class="p-button-danger" />
    </Sidebar>
  </div>
</template>

<script setup>
import SearchBar from "@/components/shared/form/SearchBar.vue";
import List from "@/components/shared/list/List.vue";
import Item from "@/components/shared/list/Item.vue";

import { ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { playlistServiceKey, musicPlayerStoreKey } from "@/serviceKeys";

const route = useRoute();
const router = useRouter();
const playlistService = inject(playlistServiceKey);
const musicPlayerStore = inject(musicPlayerStoreKey);

const playlist = ref({});
const selectedMusic = ref(null);

const sidebar = ref(false);


async function updatePlaylist() {
  playlist.value = await playlistService.getById(route.params.id);
}
updatePlaylist();

function validate() {

}

function play(music) {
  musicPlayerStore.setCurrentMusic(music);
  musicPlayerStore.setCurrentPlaylist(playlist.value);

  router.push({
    name: "player",
    params: {
      id: music.trackId
    }
  })
}

function openSideMenu(music) {
  sidebar.value = true;
  selectedMusic.value = music;
}
function closeSidebar() {
  sidebar.value = false;
  selectedMusic.value = null;
}

async function removeFromPlaylist() {
  await playlistService.removeTrackFromPlaylist(playlist.value, selectedMusic.value);
  updatePlaylist();

  closeSidebar();
}

function sortArtistName() {
  playlist.value.tracks = sortByAlphabetical(playlist.value.tracks, "artistName");
}
function sortGenre() {
  playlist.value.tracks = sortByAlphabeticalAccess(playlist.value.tracks, (track) => track.genres[0].name);
}
function sortTrackName() {
  playlist.value.tracks = sortByAlphabetical(playlist.value.tracks, "trackName");
}

function sortByAlphabetical(array, propertyPath) {
  return array.sort(function (a, b) {
    if (a[propertyPath] < b[propertyPath]) {
      return -1;
    }
    if (a[propertyPath] > b[propertyPath]) {
      return 1;
    }
    return 0;
  });
}

function sortByAlphabeticalAccess(array, access) {
  return array.sort(function (a, b) {
    if (access(a) < access(b)) {
      return -1;
    }
    if (access(a) > access(b)) {
      return 1;
    }
    return 0;
  });
}
</script>

<style lang="scss" scoped>
.page__playlists {
  .search-bar {
    margin: $content-padding 0;
  }
}

.sidebar {
  button {
    width: 100%;
    margin: .25rem 0;
  }
}
</style>