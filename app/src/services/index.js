import MusicService from "./apiServices/MusicService";
import PlaylistService from "./apiServices/PlaylistService";
import RecommendationService from "./apiServices/RecommendationService";
import UserService from "./apiServices/UserService";
import AuthService from "./AuthService";

export const authService = new AuthService();
export const userService = new UserService();
export const musicService = new MusicService();
export const recommendationService = new RecommendationService();
export const playlistService = new PlaylistService();

export default {
  install(app) {
    authService.provide(app);
    userService.provide(app);
    musicService.provide(app);
    recommendationService.provide(app);
    playlistService.provide(app);
  }
}