<template>
  <div class="page">
    <h3>{{ $t('shared.profil') }}</h3>
    <div class="profil">

      <Inplace :closable="true" @close="saveUser">
        <template #display>
          <img :src="user.profilePictureUrl">
        </template>
        <template #content>
          <InputText v-model="user.profilePictureUrl" autoFocus />
        </template>
      </Inplace>

      <Inplace :closable="true" @close="saveUser">
        <template #display>
          <h1>{{ user.nom }}</h1>
        </template>
        <template #content>
          <InputText v-model="user.nom" autoFocus />
        </template>
      </Inplace>

      <Inplace :closable="true" @close="saveUser">
        <template #display>
          <h4>{{ user.email }}</h4>
        </template>
        <template #content>
          <InputText v-model="user.email" autoFocus />
        </template>
      </Inplace>
      
    </div>
    <Button @click="logout" :label="$t('shared.disconnect')" icon="pi pi-sign-out" class="p-button-secondary m-button" />
    <Button @click="deleteAccount" :label="$t('profil.delete')" icon="pi pi-times" class="p-button-danger m-button" />
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

async function deleteAccount() {
  userStore.deleteAccount();
}

function saveUser() {
  userStore.updateUser(user);
}
</script>

<style lang="scss">
.profil {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  > * {
    margin: 1.5rem 0 !important;
  }

  h1,
  h4 {
    text-align: left;
    margin: 0;
  }

  img {
    width: 80%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
  }
}

.m-button {
  margin: .5rem 0 !important;
}

.p-inplace-display {
  display: flex !important;
  justify-content: center;
  align-items: center;
}

.p-inplace-content {
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>