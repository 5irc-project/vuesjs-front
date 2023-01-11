import { computed, inject, onMounted, onBeforeUnmount } from "vue";
import { storeToRefs } from "pinia";
import { musicPlayerStoreKey } from "@/serviceKeys";

export default function usePlayer() {
  const musicPlayerStore = inject(musicPlayerStoreKey);
  const musicService = musicPlayerStore.getService;
  
  const { musicState } = storeToRefs(musicPlayerStore);
  
  const isLoaded = computed(() => {
    return musicState.value;
  });
  
  const artists = computed(() => {
    return musicState.value?.item?.artists.reduce(
      (string, newArtist) =>
        (string += string != "" ? `, ${newArtist.name}` : newArtist.name),
      ""
    );
  });
  
  const title = computed(() => {
    return musicState.value.item?.name;
  });
  
  const img = computed(() => {
    return musicState.value.item?.album?.images[1].url
  });
  
  const position = computed({
    get() {
      return musicState.value.progress_ms;
    },
    set(value) {
      musicService.seek(value);
    },
  });
  
  const duration = computed(() => {
    return musicState.value.item?.duration_ms;
  });
  
  const playIcon = computed(() => {
    return musicState.value.is_playing ? "pi-pause" : "pi-caret-right";
  });

  const device = computed(() => {
    return musicState.value.device;
  });
  
  async function togglePlay() {
    await musicService.togglePlay();
  }
  
  async function previousTrack() {
    await musicService.previousTrack();
  }
  
  async function nextTrack() {
    await musicService.nextTrack();
  }
  
  // eslint-disable-next-line
  let timeInterval;
  
  onMounted(() => {
    timeInterval = setInterval(() => {
      if (musicState.value.paused) return;
  
      // musicState.value.position += 1000;
    }, 1000);
  });
  
  onBeforeUnmount(() => {
    clearInterval(timeInterval);
  });

  return { musicState, isLoaded, artists, title, img, position, duration, playIcon, device, togglePlay, previousTrack, nextTrack };
}

