import router from "@/router";
import { useUserStore } from "@/store/modules/user";
import { useMusicPlayerStore } from "@/store/modules/musicPlayer";
import MusicPlayerService from "./MusicPlayerService";


export default class SpotifyService extends MusicPlayerService {
  constructor() {
    super(document.env.VUE_APP_SPOTIFY_BASE_URL);

    this.http.interceptors.request.use(config => this.authorize(config));

    this.client_id = document.env.VUE_APP_SPOTIFY_CLIENT_ID;
    this.redirect_uri = document.env.VUE_APP_SPOTIFY_REDIRECT_URI;
    this.scopes = document.env.VUE_APP_SPOTIFY_SCOPES;
    this.token = this.userStore.getToken;

    this.deviceChangedCallback;

    if (!this.scopes || !this.redirect_uri || !this.client_id) {
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
  async changeDevice(device_id) {
    const response = await this.http.put("me/player", {
      device_ids: [device_id],
      play: true
    });

    if(this.deviceChangedCallback) {
      setTimeout(() => {
        this.deviceChangedCallback();
      }, 300)
    }

    return response;
  }
  play() {
    return this.player.resume();
  }
  pause() {
    return this.player.pause();
  }
  async search(query) {
    const { data } = await this.http.get(`search?q=${query}&type=track&limit=1`);
    return data.tracks.items[0];
  }
  playTrack(trackId = null) {
    return this.http.put("me/player/play", {
      uris: trackId !== null ? [trackId] : []
    });
  }



  async login(authService) {
    const { data } = await authService.authSpotify();
    const popup = window.open(data, 'Login with Spotify', 'width=800,height=600')

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
      router.push({ name: "match" });
    }
  }
  logout() {
    this.pause();
  }

  initialize() {
    window.onSpotifyWebPlaybackSDKReady = function () {
      this.PlayerClass = window.Spotify.Player;

      if (this.userStore.isLoggedIn) {
        this.createPlayer();
      }
    }.bind(this);
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
      await this.updateState();

      this.changeDevice(device_id)
    });

    this.player.addListener('player_state_changed', async (state) => {
      const musicPlayerStore = useMusicPlayerStore();
      musicPlayerStore.setState(state);
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

    const musicPlayerStore = useMusicPlayerStore();

    setInterval(() => {
      const state = musicPlayerStore.getState; 

      if (state.paused) return;
      
      state.position += 1000;
      musicPlayerStore.setState(state);
    }, 1000);

    this.player.connect();
  }

  async updateState(state = null) {
    const musicPlayerStore = useMusicPlayerStore();

    if (state === null) {
      state = await this.getState();
    }

    if (state === "") {
      return;
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
  }

  async getState() {
    return this.player.getCurrentState();
  }

  // volume
  async getVolume() {
    return this.player.getVolume();
  }
  async setVolume(volume) {
    return this.player.setVolume(volume);
  }

  onDeviceChanged(callback) {
    this.deviceChangedCallback = callback;
  }
}