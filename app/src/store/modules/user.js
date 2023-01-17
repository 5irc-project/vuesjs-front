import { defineStore } from "pinia";
import { userService } from "@/services";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useStorage("user", {}),

    authToken: useStorage("authToken", undefined),
    spotifyTokens: useStorage("spotifyTokens", {})
  }),
  getters: {
    getUser: (state) => state.user,
    getRole: (state) => state.user.role,
    getSpotifyTokens: (state) => state.spotifyTokens,
    getAuthToken: (state) => state.authToken,
    isLoggedIn: (state) => state.authToken !== undefined,
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
      this.setUser({});
      this.setAuthToken(undefined);
      this.setSpotifyTokens({});
    },
    setSpotifyTokens(spotifyTokens) {
      this.spotifyTokens = spotifyTokens;
    },
    setAuthToken(jwtToken) {
      this.authToken = jwtToken;
    },

    // actions
    async login(jwtToken) {
      this.resetUser();
      
      this.setAuthToken(jwtToken);
      const user = await userService.getProfil();

      this.setUser(user);
    },
    async updateUser(modifiedUser) {
      const user = await userService.updateProfil(modifiedUser);
      this.setUser(user);
    },
    logout() {
      this.resetUser();
      this.router.push({ name: "login" });
    },
    async deleteAccount() {
      await userService.deleteProfil();
      this.logout();
    }
  },
});
