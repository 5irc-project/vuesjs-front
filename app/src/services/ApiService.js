import Http from "@/utils/Http";
import { useUserStore } from "@/store/modules/user";

const BASE_URL = document.env.VUE_APP_API_BASE_URL;

export default class ApiService extends Http {
  constructor(controller, key, url = BASE_URL) {
    super(`${url}/${controller}`);

    this.http.interceptors.request.use(config => this.authorize(config));
    this.serviceKey = key;
  }

  provide(app) {
    app.provide(this.serviceKey, this);
  }

  authorize(config) {
    this.token = useUserStore().getAuthToken;
    try {
      if (this.token) {
        config.headers["Content-Type"] = "application/json";
        config.headers["Authorization"] = `Bearer ${this.token}`;
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
