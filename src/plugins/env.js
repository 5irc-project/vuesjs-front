import { envStoreName } from "@/store/modules/configuration"

const envOverride = JSON.parse(localStorage.getItem(envStoreName));
document.env = { ...process.env, ...envOverride }

export default {
  install() {
  },
};
