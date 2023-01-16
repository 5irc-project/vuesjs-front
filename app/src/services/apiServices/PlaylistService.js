import ApiService from "@/services/ApiService";
import { playlistServiceKey } from "@/serviceKeys";
import { PLAYLIST_KIND } from "@/utils/enums";

const controller = "api/Playlist";

export default class PlaylistService extends ApiService {
  constructor() {
    super(controller, playlistServiceKey, "https://localhost:7153");
  }

  async getMyPlaylists() {
    const userId = 0;
    const { data } = await this.get(`User/${userId}`);
    return data || [];
  }

  async getById(id) {
    const { data } = await this.get(`${id}`);
    return data;
  }


  async getSeparatedPlaylists() {
    const playlists = await this.getMyPlaylists();

    const myPlaylists = playlists.filter(p => p.kindId === PLAYLIST_KIND.MANUAL);
    const generatedPlaylists = playlists.filter(p => p.kindId === PLAYLIST_KIND.GENERATED);

    return { myPlaylists, generatedPlaylists };
  }
}
