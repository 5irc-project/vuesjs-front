import AuthService from "./AuthService";

export const authService = new AuthService();

export default {
  install(app) {
    authService.provide(app);
  }
}