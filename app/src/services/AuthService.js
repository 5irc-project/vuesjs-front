import ApiService from "./ApiService";
import { authServiceKey } from "@/serviceKeys";

const controller = "api/Auth";

export default class AuthService extends ApiService {
  constructor() {
    super(controller, authServiceKey, "https://localhost:7091");
  } 
  
  authSpotify() {
    return this.get("/auth");
  }

  getSecret() {
    return this.get("/secret");
  }
}
