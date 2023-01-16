<template>
  <div class="page">
    <h1>Musics</h1>
    <div class="page__search">
      <SearchBar placeholder="Search a music" v-model="query"/>
    </div>
    <List>
      <Item
        v-for="music in musics"
        :key="music.trackId"
        :title="music.trackName"
        :description="music.description"
        @click="play(music)"
      />
    </List>
  </div>
</template>

<script setup>
import SearchBar from "@/components/shared/form/SearchBar.vue";
import List from "@/components/shared/list/List.vue";
import Item from "@/components/shared/list/Item.vue";

import { ref, inject, watch } from "vue";
import { useRouter } from "vue-router";
import { musicServiceKey } from "@/serviceKeys";

const router = useRouter();
const musicService = inject(musicServiceKey);
const query = ref("");
const musics = ref([]);

watch(query, async (newQuery) => {
  musics.value = await musicService.getListByQuery(newQuery);
});

function play(music) {
  router.push({
    name: "player",
    params: {
      id: music.trackId
    }
  })
}

</script>

<style lang="scss" scoped>
.page__search {
  .search-bar {
    margin: $content-padding 0;
  }
}
</style>