import { createPinia } from "pinia";
import { markRaw } from "vue";
import router from "@/router";

import { userStoreKey, configurationStoreKey } from "@/serviceKeys";

import { useUserStore } from "./modules/user";
import { useConfigurationStore } from "./modules/configuration";

export default {
  install(app) {
    const pinia = createPinia();
    
    // include router to modules
    pinia.use(({ store }) => {
      store.router = markRaw(router);
    });

    app.use(pinia);

    app.provide(userStoreKey, useUserStore());
    app.provide(configurationStoreKey, useConfigurationStore());
  },
};
