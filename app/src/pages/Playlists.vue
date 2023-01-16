<template>
  <div class="page">
    <h1>Playlists</h1>
    <div class="page__playlists">
      <div class="page__playlists-header">
        <SearchBar placeholder="Search a playlist" />
        <Button icon="pi pi-plus" class="p-button-rounded p-button-secondary" />
      </div>
      <TabView :activeIndex="1">
        <TabPanel header="Generated">
          <List>
            <Item v-for="playlist in myGeneratedPlaylists" :key="playlist.playlistId" :imageSrc="playlist.imageSrc"
              :title="playlist.playlistName" :description="playlist.description" @clickItem="redirect(playlist)"
              @clickAction="openSideMenu(playlist)" />
          </List>
        </TabPanel>
        <TabPanel header="Mine">
          <List>
            <Item v-for="playlist in playlists" :key="playlist.playlistId" :imageSrc="playlist.imageSrc"
              :title="playlist.playlistName" :description="playlist.description" @clickItem="redirect(playlist)"
              @clickAction="openSideMenu(playlist)" />
          </List>
        </TabPanel>
      </TabView>
    </div>
    <Sidebar v-model:visible="sidebar" :baseZIndex="10000" position="bottom" class="sidebar">
      <h3>{{ $t('shared.options') }}</h3>
      <Button @click="deletePlaylist" :label="$t('playlist.delete')" icon="pi pi-times" class="p-button-danger" />
      <Button v-if="isGenerated" type="button" :label="$t('playlist.validate')" icon="pi pi-check"
        class="p-button-success" badgeClass="p-badge-danger" @click="validate" />
    </Sidebar>
  </div>
</template>

<script setup>
import SearchBar from "@/components/shared/form/SearchBar.vue";
import List from "@/components/shared/list/List.vue";
import Item from "@/components/shared/list/Item.vue";

import { ref, inject, computed } from "vue";
import { useRouter } from "vue-router";

import { playlistServiceKey } from "@/serviceKeys";
import { PLAYLIST_KIND } from "@/utils/enums";

const router = useRouter();
const playlistService = inject(playlistServiceKey);

function redirect(playlist) {
  router.push({ name: "playlist", params: { id: playlist?.playlistId } });
}

const playlists = ref([]);
const myGeneratedPlaylists = ref([]);
const sidebar = ref(false);

const selectedPlaylist = ref(null);
const isGenerated = computed(() => {
  return selectedPlaylist.value?.kindId === PLAYLIST_KIND.GENERATED;
});


async function updatePlaylists() {
  const { myPlaylists, generatedPlaylists } = await playlistService.getSeparatedPlaylists();

  playlists.value = myPlaylists;
  myGeneratedPlaylists.value = generatedPlaylists;
}
updatePlaylists();


function openSideMenu(playlist) {
  sidebar.value = true;
  selectedPlaylist.value = playlist;
}
function closeSidebar() {
  sidebar.value = false;
  selectedPlaylist.value = null;
}

async function deletePlaylist() {
  if (selectedPlaylist.value === null)
    return;

  await playlistService.deletePlaylist(selectedPlaylist.value.playlistId);
  updatePlaylists();

  closeSidebar();
}

async function validate() {
  if (selectedPlaylist.value === null)
    return;

  await playlistService.validatePlaylist(selectedPlaylist.value);
  updatePlaylists();
  
  closeSidebar();
}
</script>

<style lang="scss" scoped>
.page__playlists {
  .search-bar {
    margin: $content-padding 0;
  }

  &-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    button {
      margin-left: .5rem;
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