import ApiService from "@/services/ApiService";
import { userServiceKey } from "@/serviceKeys";

const controller = "user";

export default class UserService extends ApiService {
  constructor() {
    super(controller, userServiceKey);
  }

  async getProfil() {
    return {
      userId: 1,
      nom: 'Mathis FIGUET',
      email: 'mathis.figuet@orange.fr',
      profilePictureUrl: 'https://t4.ftcdn.net/jpg/04/02/23/77/360_F_402237751_GdcaONhARorU2e7CytlX67npqOfyFhqL.jpg'
    }
  }

  async updateProfil(profil) {
    return profil;
  }

  async deleteProfil() {
    return;
  }
}
