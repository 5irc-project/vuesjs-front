import { spotifyServiceKey } from "@/serviceKeys";
import { useUserStore } from "@/store/modules/user";
import router from "@/router";


export default class SpotifyService {
  constructor() {
    this.serviceKey = spotifyServiceKey;
  }

  provide(app) {
    app.provide(this.serviceKey, this);
    this.userStore = useUserStore();
  }

  login() {
    const client_id = document.env.VUE_APP_SPOTIFY_CLIENT_ID;
    const redirect_uri = document.env.VUE_APP_SPOTIFY_REDIRECT_URI;
    const scopes = document.env.VUE_APP_SPOTIFY_SCOPES;

    const popup = window.open(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')
      
    window.spotifyCallback = async (payload) => {
      popup.close();


      const userStore = useUserStore();

      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': `Bearer ${payload}`
        }
      });

      const data = await response.json()

      console.log(data)

      userStore.setUser({
        ...data,
        token: payload
      });

      router.push({ name: "home" });
    }
  }
}