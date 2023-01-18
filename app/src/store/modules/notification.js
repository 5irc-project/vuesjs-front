import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";


export const useNotificationStore = defineStore("notification", {
  state: () => ({
    hasGeneratedBadge: useStorage("hasGeneratedBadge", false)
  }),
  getters: {
  },
  actions: {
    setHasGeneratedBadge(hasGeneratedBadge) {
      this.hasGeneratedBadge = hasGeneratedBadge;
    },
    setGeneratedBadge(isGenerated) {
      if(isGenerated === false) {
        return;
      }
      
      this.setHasGeneratedBadge(isGenerated);
    },
    resetGeneratedBadge() {
      this.setHasGeneratedBadge(false);
    }
  },
});
