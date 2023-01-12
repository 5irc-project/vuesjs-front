<template>
  <div class="page">
    <h1>Playlists</h1>
    <div class="page__playlists">
      <SearchBar />
      <TabView :activeIndex="1">
        <TabPanel header="Generated">
          <List>
            <Item
              imageSrc="images/image.PNG"
              title="title"
              description="description"
            />
          </List>
        </TabPanel>
        <TabPanel header="Mine">
          <List>
            <Item
              imageSrc="images/image.PNG"
              title="title"
              description="description"
              @clickAction="() => console.log('hello')"
            />
            <Item
              imageSrc="images/image.PNG"
              title="title"
              description="description"
            />
            <Item
              imageSrc="images/image.PNG"
              title="title"
              description="description"
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
// import { useRouter } from "vue-router";

// const router = useRouter();
</script>

<style lang="scss" scoped>
.page__playlists {
  .search-bar {
    margin: $content-padding 0;
  }
}
</style>