import ApiService from "@/services/ApiService";
import { userServiceKey } from "@/serviceKeys";

const controller = "api/user";

export default class UserService extends ApiService {
  constructor() {
    super(controller, userServiceKey, document.env.VUE_APP_API_USER_BASE_URL);
  }

  async getProfil() {
    const { data } = await this.get('profile');
    return data;
  }

  async updateProfil(profil) {
    const { data } = await this.put(`update/`, profil);
    return data;
  }

  async deleteProfil() {
    return await this.delete('delete');
  }
}
