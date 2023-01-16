<template>
  <div class="page">
    <h1>Musics</h1>
    <div class="page__search">
      <SearchBar placeholder="Search a music"/>
    </div>
  </div>
</template>

<script setup>
import SearchBar from "@/components/shared/form/SearchBar.vue";
</script>

<style lang="scss" scoped>
.page__search {
  .search-bar {
    margin: $content-padding 0;
  }
}
</style>