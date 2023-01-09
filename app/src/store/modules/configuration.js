import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const envStoreName = "env";

export const useConfigurationStore = defineStore("configuration", {
  state: () => ({
    env: useStorage("env", {}),
  }),
  getters: {
  },
  actions: {
  },
});
