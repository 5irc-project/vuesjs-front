<template>
  <div>
    <div v-for="device in devices" :key="device.name" @click="changeDevice(device)">
      {{ device.name }}
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { musicPlayerStoreKey } from "@/serviceKeys";

const musicPlayerStore = inject(musicPlayerStoreKey);
const spotifyService = musicPlayerStore.getService;

const devices = ref([]);
spotifyService.getDevices().then(({ data }) => {
  devices.value = data.devices;
});

function changeDevice(device) {
  spotifyService.changeDevice(device.id);
}

</script>