import { defineStore } from "pinia";
import SpotifyService from "@/services/musicPlayerServices/SpotifyService";

export const useMusicPlayerStore = defineStore("musicPlayer", {
  state: () => ({
    service: new SpotifyService(),
    musicState: {}
  }),
  getters: {
    getService: (state) => state.service, 
    getState: (state) => state.musicState 
  },
  actions: {
    setState(musicState) {
      this.musicState = { ...musicState };
    },
  },
});
