import AuthService from "./AuthService";
import SpotifyService from "./SpotifyService";

export const authService = new AuthService();
export const spotifyService = new SpotifyService();

export default {
  install(app) {
    authService.provide(app);
    spotifyService.provide(app);
  }
}