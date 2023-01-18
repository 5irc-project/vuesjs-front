import { createPinia } from "pinia";
import { markRaw } from "vue";
import router from "@/router";

import { userStoreKey, configurationStoreKey, musicPlayerStoreKey, notificationStoreKey } from "@/serviceKeys";

import { useUserStore } from "./modules/user";
import { useConfigurationStore } from "./modules/configuration";
import { useMusicPlayerStore } from "./modules/musicPlayer";
import { useNotificationStore } from "./modules/notification";

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
    app.provide(musicPlayerStoreKey, useMusicPlayerStore());
    app.provide(notificationStoreKey, useNotificationStore());
  },
};
