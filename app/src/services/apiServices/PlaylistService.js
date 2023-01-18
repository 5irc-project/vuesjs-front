import ApiService from "@/services/ApiService";
import { playlistServiceKey } from "@/serviceKeys";
import { PLAYLIST_KIND } from "@/utils/enums";
import { useUserStore } from "@/store/modules/user";

const controller = "api/Playlist";

export default class PlaylistService extends ApiService {
  constructor() {
    super(controller, playlistServiceKey, document.env.VUE_APP_API_PLAYLIST_BASE_URL);
  }

  async getMyPlaylists() {
    const userId = useUserStore().getUserId;
    const { data } = await this.get(`User/${userId}`);
    return data || [];
  }

  async getById(id) {
    const { data } = await this.get(`${id}`);
    return data;
  }

  addPlaylist(playlist) {
    return this.post('', playlist);
  } 

  deletePlaylist(id) {
    return this.delete(`${id}`);
  }

  updatePlaylist(playlist) {
    return this.put(`${playlist.playlistId}`, playlist);
  }

  async addTrackFromPlaylist(playlist, track) {
    const data = await this.post(`/PlaylistTrack/Add/${playlist.playlistId}`, [ track ]);
    return data;
  }

  async removeTrackFromPlaylist(playlist, track) {
    const data = await this.post(`/PlaylistTrack/Remove/${playlist.playlistId}`, [ track ]);
    return data;
  }


  async getSeparatedPlaylists() {
    const playlists = await this.getMyPlaylists();

    const myPlaylists = playlists.filter(p => p.kindId === PLAYLIST_KIND.MANUAL);
    const generatedPlaylists = playlists.filter(p => p.kindId === PLAYLIST_KIND.GENERATED);

    return { myPlaylists, generatedPlaylists };
  }

  async validatePlaylist(playlist) {
    const validatedPlaylist = {
      ...playlist,
      kindId: PLAYLIST_KIND.MANUAL
    }

    const data = await this.updatePlaylist(validatedPlaylist);
    return data;
  }

  async getAvailablePlaylists(musicId) {
    const { data } = await this.get(`Trackless/${musicId}`);
    return data;
  }

  async getRecommendations(tracks) {
    const { data } = await this.post(`Recommendation/Dev`, tracks);
    return data;
  }
}
