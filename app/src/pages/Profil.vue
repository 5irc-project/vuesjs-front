<template>
  <div>{{ $t('shared.profil') }}</div>
  <Button @click="userStore.logout" :label="$t('shared.disconnect')" icon="pi pi-sign-out" class="p-button-secondary" />
</template>

<script setup>
import { inject } from "vue";
import { userStoreKey } from "@/serviceKeys";

const userStore = inject(userStoreKey);
</script>