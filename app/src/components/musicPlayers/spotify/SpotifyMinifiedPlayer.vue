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
import { storeToRefs } from "pinia";
import { musicPlayerStoreKey } from "@/serviceKeys";

const musicPlayerStore = inject(musicPlayerStoreKey);
const spotifyService = musicPlayerStore.getService;

const { musicState } = storeToRefs(musicPlayerStore);

const devices = ref([]);
spotifyService.getDevices().then(({ data }) => {
  devices.value = data.devices;

  console.log(currentDevice.value);
});

const currentDevice = computed(() => {
  return musicState.value.device;
});
</script>