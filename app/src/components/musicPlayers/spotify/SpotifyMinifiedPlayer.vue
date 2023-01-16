<template>
  <MinifiedPlayer>
    <span style="font-size: 0.75rem; text-align: left;">{{
      currentDevice?.name
    }}</span>

    <template v-slot:actions>
      <DeviceManager />
    </template>
  </MinifiedPlayer>
</template>

<script setup>
import MinifiedPlayer from "@/components/musicPlayers/MinifiedPlayer.vue";
import DeviceManager from "./DeviceManager.vue";

import { computed, inject, ref } from "vue";
import { musicPlayerStoreKey } from "@/serviceKeys";

const musicPlayerStore = inject(musicPlayerStoreKey);
const spotifyService = musicPlayerStore.getService;

spotifyService.onDeviceChanged(updateDevices);

const devices = ref([]);

function updateDevices() {
  spotifyService.getDevices().then(({ data }) => {
    devices.value = data.devices;
  });
}
updateDevices();

const currentDevice = computed(() => {
  return devices.value?.find(d => d.is_active === true);
});
</script>

<style scoped>
span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>