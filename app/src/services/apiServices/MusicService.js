import ApiService from "@/services/ApiService";
import { musicServiceKey } from "@/serviceKeys";

const controller = "music";

export default class MusicService extends ApiService {
  constructor() {
    super(controller, musicServiceKey);
  }

  getById(id) {
    return new Promise((resolve) => {
      resolve({
        imageSrc: "images/image.PNG",
        title: "Duality",
        artists: "Slipknot",
        description: "Description",
        id: id,
        isGenerated: true
      });
    });
  }
}
