import { useUserStore } from "@/store/modules/user";
import { useMusicPlayerStore } from "@/store/modules/musicPlayer";
import router from "@/router";
import MusicPlayerService from "./MusicPlayerService";


export default class SpotifyService extends MusicPlayerService {
  constructor() {
    super(document.env.VUE_APP_SPOTIFY_BASE_URL);
    
    this.http.interceptors.request.use(config => this.authorize(config));

    this.client_id = document.env.VUE_APP_SPOTIFY_CLIENT_ID;
    this.redirect_uri = document.env.VUE_APP_SPOTIFY_REDIRECT_URI;
    this.scopes = document.env.VUE_APP_SPOTIFY_SCOPES;
    this.token = this.userStore.getToken;

    if(!this.scopes || !this.redirect_uri || !this.client_id) {
      console.warn("Spotify environment variables undefined !");
    }
  }

  authorize(config) {
    try {
      if (this.token) {
        config.headers["Content-Type"] = "application/json";
        config.headers["Authorization"] = `Bearer ${this.token}`;
      }
    } catch (error) {
      console.error(error);
    }

    return config;
  }

  getProfil() {
    return this.http.get("/me");
  }
  getDevices() {
    return this.http.get("me/player/devices");
  }
  async getState() {
    const { data } = await this.http.get("me/player");
    return data;
  }


  login() {
    const popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.client_id}&response_type=token&redirect_uri=${this.redirect_uri}&scope=${this.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')

    window.spotifyCallback = async (payload) => {
      popup.close();

      this.token = payload;
      const { data } = await this.getProfil();
      
      const userStore = useUserStore();
      userStore.setUser({
        ...data,
        token: payload
      });

      this.createPlayer();
      router.push({ name: "home" });
    }
  }

  initialize() {
    window.onSpotifyWebPlaybackSDKReady = function () {
      this.PlayerClass = window.Spotify.Player;

      if(this.userStore.isLoggedIn) {
        this.createPlayer();
      }
    }.bind(this);

    const token = window.location.hash.substr(1).split("&")[0].split("=")[1];
    if (token) {
      window.opener.spotifyCallback(token);
    }
  }

  createPlayer() {
    const userStore = useUserStore();

    // eslint-disable-next-line
    this.player = new this.PlayerClass({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(userStore.getToken); }
    });

    this.player.addListener('ready', async ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      this.updateState()
      
      setInterval(async () => {
        await this.updateState()
      }, 1000);
    });

    this.player.addListener('player_state_changed', async () => {
      const data = await this.getState();

      const musicPlayerStore = useMusicPlayerStore();
      musicPlayerStore.setState(data);
    });

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    this.player.addListener('initialization_error', ({ message }) => {
      console.error(message);
    });

    this.player.addListener('authentication_error', ({ message }) => {
      console.error(message);
    });

    this.player.addListener('account_error', ({ message }) => {
      console.error(message);
    });

    this.player.connect();
  }

  async updateState(state = null) {
    const musicPlayerStore = useMusicPlayerStore();

    if(state === null) {
      state = await this.getState();
    }

    musicPlayerStore.setState(state);
  }

  async togglePlay() {
    await this.player.togglePlay();
    await this.updateState();
  }
  async seek(trackTimeMS) {
    return this.player.seek(trackTimeMS);
  }

  async previousTrack() {
    await this.player.previousTrack();
    await this.updateState();
  }
  async nextTrack() {
    await this.player.nextTrack();
    await this.updateState();

    const musicPlayerStore = useMusicPlayerStore();
    console.log(musicPlayerStore.getState)
  }

  async getCurrentState() {
    return this.player.getCurrentState();
  }

  // volume
  async getVolume() {
    return this.player.getVolume();
  }
  async setVolume(volume) {
    return this.player.setVolume(volume);
  }
}