<template>
  <span class="p-input-icon-left search-bar">
    <i class="pi pi-search" />
    <InputText type="text" placeholder="Search playlists" />
  </span>
</template>

<script setup>
// import { useRouter } from "vue-router";

// const router = useRouter();
</script>

<style lang="scss">
.search-bar {
  width: 100%;

  > input {
    width: 100%;
  }
}
</style>