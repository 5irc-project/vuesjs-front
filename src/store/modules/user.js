import { defineStore } from "pinia";
import { authService } from "@/services";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: useStorage("user", {}),
  }),
  getters: {
    getUser: (state) => state.user,
    getRole: (state) => state.user.role,
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

    // actions
    async login(email, password) {
      this.resetUser();
      const response = await authService.authenticate(email, password);

      if (response.status === 401) {
        throw new Error(response.statusText);
      }

      this.setUser(response.data);
    },
    logout() {
      this.resetUser();
      this.router.push({ name: "login" });
    },
  },
});
