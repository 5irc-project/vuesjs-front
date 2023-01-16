<template>
  <div class="page">
    <h3>{{ $t('shared.profil') }}</h3>
    <h1> {{ user.display_name }}</h1>
    <Button @click="logout" :label="$t('shared.disconnect')" icon="pi pi-sign-out" class="p-button-secondary" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import { userStoreKey, musicPlayerStoreKey } from "@/serviceKeys";

const userStore = inject(userStoreKey);
const musicPlayerStore = inject(musicPlayerStoreKey);

const user = userStore.getUser;
const musicPlayerService = musicPlayerStore.getService;

function logout() {
  userStore.logout();
  musicPlayerService.logout();
}
</script>