import { createI18n } from "vue-i18n";

//import en from "./locales/en.json";
import fr from "./locales/fr.json";

export const defaultLocale = document.env.VUE_APP_I18N_LOCALE;

export const languages = {
  //en,
  fr,
};

const messages = Object.assign(languages);

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: document.env.VUE_APP_I18N_FALLBACK_LOCALE,
  messages,
});

export { i18n };