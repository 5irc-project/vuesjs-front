import ApiService from "./ApiService";
import { authServiceKey } from "@/serviceKeys";

const controller = "api/Auth";

export default class AuthService extends ApiService {
  constructor() {
    super(controller, authServiceKey, document.env.VUE_APP_API_AUTH_BASE_URL);
  } 
  
  authSpotify() {
    return this.get("/auth");
  }

  getSecret() {
    return this.get("/secret");
  }
}
