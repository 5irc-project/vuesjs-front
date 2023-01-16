<template>
  <div class="b-list">
    <slot />
  </div>
</template>

<script setup>
</script>

<style lang="scss">
.b-list {
  max-height: 80%;
  overflow-y: scroll;

  > :not(:last-child) { 
    margin-bottom: $content-padding;
  }
}
</style>