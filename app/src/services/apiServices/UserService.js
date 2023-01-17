import ApiService from "@/services/ApiService";
import { userServiceKey } from "@/serviceKeys";

const controller = "api/users";

export default class UserService extends ApiService {
  constructor() {
    super(controller, userServiceKey, "https://localhost:7008");
  }

  async getProfil() {
    const { data } = await this.getProfil('/profil');
    return data;
  }

  async updateProfil(profil) {
    const { data } = await this.put(`${profil.userId}`, profil);
    return data;
  }

  async deleteProfil() {
    return await this.delete('');
  }
}
