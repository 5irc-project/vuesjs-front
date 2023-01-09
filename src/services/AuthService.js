import ApiService from "./ApiService";
import { authServiceKey } from "@/serviceKeys";

const controller = "app/auth";

export default class AuthService extends ApiService {
  constructor() {
    super(controller, authServiceKey);
  }
  
  authenticate(email, password) {
    return this.post("/authenticate", { email, password });
  }

  getSecret() {
    return this.get("/secret");
  }
}
