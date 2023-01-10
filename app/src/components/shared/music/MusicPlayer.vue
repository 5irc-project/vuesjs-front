<template>
  <Player>
    <template v-slot:actions>
      <Button icon="pi pi-filter-slash" class="p-button-rounded p-button-action" />
      <Button icon="pi pi-step-backward" class="p-button-rounded p-button-action" />
      <Button icon="pi pi-caret-right" class="p-button-rounded p-button-action p-button-main" />
      <Button icon="pi pi-step-forward" class="p-button-rounded p-button-action" />
      <Button icon="pi pi-sync" class="p-button-rounded p-button-action" />
    </template>
  </Player>
</template>

<script setup>
import Player from "@/components/shared/music/Player.vue";
</script>