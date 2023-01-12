<template>
  <div class="b-list">
    <slot />
  </div>
</template>

<script setup>
</script>

<style lang="scss">
.b-list {
  > :not(:last-child) { 
    margin-bottom: $content-padding;
  }
}
</style>