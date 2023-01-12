<template>
  <span class="p-input-icon-left search-bar">
    <i class="pi pi-search" />
    <InputText type="text" :placeholder="props.placeholder" />
  </span>
</template>

<script setup>
const props = defineProps({
  placeholder: String,
});
</script>

<style lang="scss">
.search-bar {
  width: 100%;

  > input {
    width: 100%;
  }
}
</style>