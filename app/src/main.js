import { createApp } from 'vue';

import App from '@/App.vue';
import { i18nKey } from '@/serviceKeys';

import env from '@/plugins/env';

import primevue from "@/plugins/primevue.js";
import Vue3TouchEvents from "vue3-touch-events";
import log from "@/plugins/log.js";
import date from "@/plugins/date.js";

import router from '@/router';
import store from "@/store";
import { i18n } from "@/i18n";
import services from '@/services';

const app = createApp(App)
    .use(env)
    .use(log)
    .use(primevue)
    .use(Vue3TouchEvents)
    .use(router)
    .use(store)
    .use(i18n)
    .use(date)
    .use(services)

app.provide(i18nKey, i18n.global);
app.mount('#app');