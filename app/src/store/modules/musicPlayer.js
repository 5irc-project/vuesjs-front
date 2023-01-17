import { defineStore } from "pinia";
import SpotifyService from "@/services/musicPlayerServices/SpotifyService";
import { PLAY_MODE } from "@/utils/enums";

export const useMusicPlayerStore = defineStore("musicPlayer", {
  state: () => ({
    service: new SpotifyService(),
    musicState: {},

    currentMusic: null,
    currentPlaylist: null,
    playMode: PLAY_MODE.DEFAULT
  }),
  getters: {
    getService: (state) => state.service, 
    getState: (state) => state.musicState,
    
    getCurrentMusic: (state) => state.currentMusic,
    getCurrentPlaylist: (state) => state.currentPlaylist,
    getPlayMode: (state) => state.playMode,
    hasCurrentMusic() {
      return this.getCurrentMusic !== null;
    },
    hasCurrentPlaylist() {
      return this.getCurrentPlaylist !== null;
    },
    isCurrentMusic() {
      return (music) => {
        return this.currentMusic.trackId === music.trackId;
      };
    },
    isCurrentPlaylist() {
      return (playlist) => {
        return this.currentPlaylist.playlistId === playlist.playlistId;
      };
    },
    getNextMusic() {
      const i = this.getCurrentPlaylist?.tracks?.findIndex(p => p.trackId === this.getCurrentMusic.trackId);

      if(i === undefined)
        return undefined;
      
      const next = (i + 1) % this.getCurrentPlaylist.tracks.length;
      return this.getCurrentPlaylist.tracks[next];
    },
    getPreviousMusic() {
      const i = this.getCurrentPlaylist?.tracks?.findIndex(p => p.trackId === this.getCurrentMusic.trackId);

      if(i === undefined)
        return undefined;
      
      const previous = (i - 1) % this.getCurrentPlaylist.tracks.length;
      return this.getCurrentPlaylist.tracks[previous];
    },
    getRandomMusic() {
      const i = Math.floor(Math.random() * this.getCurrentPlaylist.tracks.length);
      return this.getCurrentPlaylist.tracks[i];
    },

    isRepeatMode() {
      return this.playMode === PLAY_MODE.REPEAT;
    },
    isShuffleMode() {
      return this.playMode === PLAY_MODE.SHUFFLE;
    },
    isDefaultMode() {
      return this.playMode === PLAY_MODE.DEFAULT;
    },
  },
  actions: {
    setState(musicState) {
      this.musicState = { ...musicState };
    },

    setCurrentMusic(currentMusic) {
      this.currentMusic = { ...currentMusic };
    },
    setCurrentPlaylist(currentPlaylist) {
      this.currentPlaylist = { ...currentPlaylist };
    },

    resetCurrentMusic() {
      this.currentMusic = null;
    },
    resetCurrentPlaylist() {
      this.currentPlaylist = null;
    },

    setPlayMode(playMode) {
      this.playMode = playMode;
    },
    toggleRepeatMode() {
      if(this.isRepeatMode) {
        this.setPlayMode(PLAY_MODE.DEFAULT);
      } else {
        this.setPlayMode(PLAY_MODE.REPEAT);
      }
    },
    toggleShuffleMode() {
      if(this.isShuffleMode) {
        this.setPlayMode(PLAY_MODE.DEFAULT);
      } else {
        this.setPlayMode(PLAY_MODE.SHUFFLE);
      }
    }
  },
});
