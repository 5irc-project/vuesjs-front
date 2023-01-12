<template>
  <div class="page">
    <h3>{{ $t('shared.profil') }}</h3>
    <h1> {{ userStore.getUser.display_name }}</h1>
    <Button @click="userStore.logout" :label="$t('shared.disconnect')" icon="pi pi-sign-out" class="p-button-secondary" />
  </div>
</template>

<script setup>
import { inject } from "vue";
import { userStoreKey } from "@/serviceKeys";

const userStore = inject(userStoreKey);
</script>