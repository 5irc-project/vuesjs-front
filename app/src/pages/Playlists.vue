<template>
  <div class="page">
    <h1>Playlists</h1>
    <div class="page__playlists">
      <SearchBar placeholder="Search a playlist"/>
      <TabView :activeIndex="1">
        <TabPanel header="Generated">
          <List>
            <Item
              v-for="playlist in generatedPlaylists"
              :key="playlist.id"
              :imageSrc="playlist.imageSrc"
              :title="playlist.title"
              :description="playlist.description"
              @click="redirect(playlist)"
            />
          </List>
        </TabPanel>
        <TabPanel header="Mine">
          <List>
            <Item
              v-for="playlist in playlists"
              :key="playlist.id"
              :imageSrc="playlist.imageSrc"
              :title="playlist.title"
              :description="playlist.description"
              @click="redirect(playlist)"
            />
          </List>
        </TabPanel>
      </TabView>
    </div>
  </div>
</template>

<script setup>
import SearchBar from "@/components/shared/form/SearchBar.vue";
import List from "@/components/shared/list/List.vue";
import Item from "@/components/shared/list/Item.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue-demi";

const router = useRouter();

function redirect(playlist) {
  router.push({ name: "playlist",  params: { id: playlist?.id }});
}

const playlists = ref([]);
const generatedPlaylists = ref([]);

onMounted(() => {
  playlists.value = [
    {
      imageSrc: "images/image.PNG",
      title: "Title",
      description: "Description",
      id: 123
    },
    {
      imageSrc: "images/image.PNG",
      title: "Title",
      description: "Description",
      id: 124
    },
    {
      imageSrc: "images/image.PNG",
      title: "Title",
      description: "Description",
      id: 125
    },
  ];

  generatedPlaylists.value = [
    {
      imageSrc: "images/image.PNG",
      title: "Title",
      description: "Description",
      id: 129
    },
    {
      imageSrc: "images/image.PNG",
      title: "Title",
      description: "Description",
      id: 127
    }
  ]
})
</script>

<style lang="scss" scoped>
.page__playlists {
  .search-bar {
    margin: $content-padding 0;
  }
}
</style>