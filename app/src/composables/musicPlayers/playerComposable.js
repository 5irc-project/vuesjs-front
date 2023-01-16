import { computed, inject } from "vue";
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
    return musicState.value.context?.metadata.current_item.artists.reduce(
      (string, newArtist) =>
        (string += string != "" ? `, ${newArtist.name}` : newArtist.name),
      ""
    );
  });
  
  const title = computed(() => {
    return musicState.value.context?.metadata.current_item.name;
  });
  
  const img = computed(() => {
    return musicState.value.context?.metadata.current_item.images[2].url;
  });
  
  const position = computed({
    get() {
      return musicState.value.position;
    },
    set(value) {
      musicService.seek(value);
    },
  });
  
  const duration = computed(() => {
    return musicState.value.duration;
  });
  
  const playIcon = computed(() => {
    return !musicState.value.paused ? "pi-pause" : "pi-caret-right";
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

  function play() {
    musicService.play();
  }
  function pause() {
    musicService.pause();
  }
  function playTrack(track) {
    return musicService.playTrack(track);
  }

  function search(query) {
    return musicService.search(query);
  }
  function searchByMusic(music) {
    return musicService.search(music.trackName + " " + music.artistName);
  }

  return { musicState, isLoaded, artists, title, img, position, duration, playIcon, device, play, pause, playTrack, search, searchByMusic, togglePlay, previousTrack, nextTrack };
}

