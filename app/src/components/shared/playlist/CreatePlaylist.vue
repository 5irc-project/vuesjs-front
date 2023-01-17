<template>
  <Sidebar
    v-model:visible="sidebarCreatePlaylist"
    :baseZIndex="10003"
    position="bottom"
    class="sidebar"
  >
    <h3>{{ $t("playlist.create") }}</h3>
    <span class="p-float-label">
      <InputText
        id="playlistName"
        type="text"
        v-model="newPlaylist.playlistName"
        :class="'p-invalid' ? !isNewPlaylistValid : ''"
      />
      <label for="playlistName">Name</label>
    </span>
    <Button
      type="button"
      :label="$t('playlist.validate')"
      icon="pi pi-check"
      class="p-button-success"
      @click="createNewPlaylist"
      :disabled="!isNewPlaylistValid"
    />
  </Sidebar>
</template>

<script setup>
import { ref, inject, computed, defineProps } from "vue";
import { playlistServiceKey, userStoreKey } from "@/serviceKeys";
import { PLAYLIST_KIND } from "@/utils/enums";

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["close", "update:modelValue"]);

const playlistService = inject(playlistServiceKey);
const userStore = inject(userStoreKey);

const sidebarCreatePlaylist = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(`update:modelValue`, value);
  },
});

function closeCreatePlaylist() {
  sidebarCreatePlaylist.value = false;
}

const newPlaylist = ref({
  userId: userStore.getUser.userId,
  kindId: PLAYLIST_KIND.MANUAL,
  playlistName: "",
  tracks: [],
});
const isNewPlaylistValid = computed(() => {
  return newPlaylist.value?.playlistName !== "";
});

async function createNewPlaylist() {
  if (!isNewPlaylistValid.value) {
    return;
  }

  await playlistService.addPlaylist(newPlaylist.value);

  emit("close");
  closeCreatePlaylist();
}
</script>
<style lang="scss" scoped>
.sidebar {
  button,
  input {
    width: 100%;
    margin: 0.25rem 0;
  }
}
</style>