import { defineStore } from "pinia";
import SpotifyService from "@/services/musicPlayerServices/SpotifyService";

export const useMusicPlayerStore = defineStore("musicPlayer", {
  state: () => ({
    service: new SpotifyService(),
    musicState: {},

    currentMusic: null,
    currentPlaylist: null,
    repeatMode: false
  }),
  getters: {
    getService: (state) => state.service, 
    getState: (state) => state.musicState,
    
    getCurrentMusic: (state) => state.currentMusic,
    getCurrentPlaylist: (state) => state.currentPlaylist,
    getRepeatMode: (state) => state.repeatMode,
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

    setRepeatMode(repeatMode) {
      this.repeatMode = repeatMode;
    },
    toggleRepeatMode() {
      this.repeatMode = !this.repeatMode;
    }
  },
});
