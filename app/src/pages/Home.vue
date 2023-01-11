<template>
  <div class="page">
    {{ userStore.getUser.display_name }}
  </div>
</template>

<script setup>
import { inject } from "vue";
import { userStoreKey } from "@/serviceKeys";

const userStore = inject(userStoreKey);
</script>