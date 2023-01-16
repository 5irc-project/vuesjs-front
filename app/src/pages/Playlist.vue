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
      </div>
    </div>
    <div class="page__playlists">
      <SearchBar placeholder="Search a music" />
      <List>
        <Item
          v-for="music in playlist.tracks"
          :key="music.trackId"
          :title="music.trackName"
          :description="music.description"
          @click="play(music)"
        />
      </List>
    </div>
  </div>
</template>

<script setup>
import SearchBar from "@/components/shared/form/SearchBar.vue";
import List from "@/components/shared/list/List.vue";
import Item from "@/components/shared/list/Item.vue";

import { ref, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { playlistServiceKey } from "@/serviceKeys";

const route = useRoute();
const router = useRouter();
const playlistService = inject(playlistServiceKey);

var playlist = ref({});

playlistService.getById(route.params.id).then((p) => {
  playlist.value = p;
});

function validate() {

}

function play(music) {
  router.push({
    name: "player",
    params: {
      id: music.id
    }
  })
}
</script>

<style lang="scss" scoped>
.page__playlists {
  .search-bar {
    margin: $content-padding 0;
  }
}
</style>