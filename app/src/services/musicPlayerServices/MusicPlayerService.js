import { useUserStore } from "@/store/modules/user";
import Http from "@/utils/Http";

export default class MusicPlayerService extends Http {
  constructor(baseURL = "", timeout = 10000, headers = undefined) {
    super(baseURL, timeout, headers)

    this.userStore = useUserStore();
    this.initialize();
  }

  login() {
    console.warn("Method login not implemented !");
  }

  initialize() {
    console.warn("Method login not implemented !");
  }

  play() {
    console.warn("Method login not implemented !");
  }
}