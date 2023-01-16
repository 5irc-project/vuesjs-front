import ApiService from "@/services/ApiService";
import { userServiceKey } from "@/serviceKeys";

const controller = "user";

export default class UserService extends ApiService {
  constructor() {
    super(controller, userServiceKey);
  }

  async getProfil() {
    const { data } = await this.get('profil');
    return data;
  }
}
