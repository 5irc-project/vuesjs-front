import { defineStore } from "pinia";
import { userService } from "@/services";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useStorage("user", {}),
  }),
  getters: {
    getUser: (state) => state.user,
    getRole: (state) => state.user.role,
    getSpotifyTokens: (state) => state.user.spotifyTokens,
    isLoggedIn: (state) => Object.keys(state.user).length > 0,
    isAuthorized() {
      return (profils) => {
        if (!Array.isArray(profils)) {
          profils = [profils];
        }

        return profils.includes(this.getRole);
      };
    },
  },
  actions: {
    // mutations
    setUser(user) {
      this.user = user;
    },
    resetUser() {
      this.user = {};
    },
    setSpotifyTokens(spotifyTokens) {
      this.user.spotifyTokens = spotifyTokens;
    },

    // actions
    async login(jwtToken) {
      this.resetUser();
      
      this.setUser({
        jwtToken
      });
      const user = await userService.getProfil();

      this.setUser({
        ...user,
        jwtToken
      });
    },
    logout() {
      this.resetUser();
      this.router.push({ name: "login" });
    },
  },
});
