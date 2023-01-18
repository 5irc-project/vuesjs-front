import ApiService from "@/services/ApiService";
import { musicServiceKey } from "@/serviceKeys";

const controller = "api/Track";

export default class MusicService extends ApiService {
  constructor() {
    super(controller, musicServiceKey, document.env.VUE_APP_API_MUSIC_BASE_URL);
  }

  async getById(id) {
    const { data } = await this.get(`${id}`);
    return data;
  }

  async getListByQuery(query) {
    const { data } = await this.get(`NameQuery/${query}`);
    return data;
  }

  async getRandom() {
    const { data } = await this.get(`random`);
    return data;
  }

  async isInFavorite(track) {
    const { data } = await this.get(`${track.trackId}/IsInFavorite`);
    return data;
  }
}