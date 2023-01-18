import { computed, inject, watch } from "vue";
import { storeToRefs } from "pinia";
import { musicPlayerStoreKey } from "@/serviceKeys";

export default function usePlayer() {
  const musicPlayerStore = inject(musicPlayerStoreKey);
  const musicService = musicPlayerStore.getService;
  
  const { musicState } = storeToRefs(musicPlayerStore);
  
  const isLoaded = computed(() => {
    return musicState.value;
  });

  const isDefaultMode = computed(() => {
    return musicPlayerStore.isDefaultMode;
  });

  const isShuffleMode = computed(() => {
    return musicPlayerStore.isShuffleMode;
  });

  const isRepeatMode = computed(() => {
    return musicPlayerStore.isRepeatMode;
  });
  
  const artists = computed(() => {
    return musicState.value.context?.metadata.current_item?.artists.reduce(
      (string, newArtist) =>
        (string += string != "" ? `, ${newArtist.name}` : newArtist.name),
      ""
    );
  });
  
  const title = computed(() => {
    return musicState.value.context?.metadata.current_item?.name;
  });
  
  const img = computed(() => {
    return musicState.value.context?.metadata.current_item?.images[2]?.url;
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

  watch(position, (newPosition) => {
    if(newPosition !== duration.value)
      return;

    if(isDefaultMode.value) {
      nextTrack();
    }

    if(isShuffleMode.value) {
      const music = musicPlayerStore.getRandomMusic;
      playMusicByDto(music);
    }

    if(isRepeatMode.value) {
      playMusicByDto(musicPlayerStore.getCurrentMusic)
    }
  })
  
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
    const previousMusic = musicPlayerStore.getPreviousMusic;
    
    if(previousMusic !== undefined) {
      playMusicByDto(previousMusic);
      return;
    }

    await musicService.previousTrack();
  }
  
  async function nextTrack() {
    const nextMusic = musicPlayerStore.getNextMusic;
    
    if(nextMusic !== undefined) {
      playMusicByDto(nextMusic);
      return;
    }

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
  async function searchByMusic(music) {
    return musicService.search(music.trackName + " " + music.artistName);
  }

  async function playMusicByDto(music) {
    const toPlay = await searchByMusic(music);
    await playTrack(toPlay.uri);
    musicPlayerStore.setCurrentMusic(music);
  }

  return { musicState, isLoaded, artists, title, img, position, duration, playIcon, device, play, playMusicByDto, pause, playTrack, search, searchByMusic, togglePlay, previousTrack, nextTrack };
}

