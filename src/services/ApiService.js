import Http from "@/utils/Http";
import { useUserStore } from "@/store/modules/user";

const url = document.env.VUE_APP_API_BASE_URL;

export default class ApiService extends Http {
  constructor(controller, key) {
    super(`${url}/${controller}`);

    this.http.interceptors.request.use(config => this.authorize(config));
    this.serviceKey = key;
  }

  provide(app) {
    app.provide(this.serviceKey, this);
    this.user = useUserStore().getUser;
  }

  authorize(config) {
    try {
      if (this.user && this.user.authenticationToken) {
        config.headers["Content-Type"] = "application/json";
        config.headers["Authorization"] = `Bearer ${this.user.authenticationToken}`;
      } else {
        config.headers["Access-Control-Allow-Origin"] = document.env.VUE_APP_CORS_ACCESS_CONTROL_ALLOW_ORIGIN;
        config.headers["Allow"] = document.env.VUE_APP_CORS_ALLOW;
      }
    } catch (error) {
      console.error(error);
    }

    return config;
  }
}
