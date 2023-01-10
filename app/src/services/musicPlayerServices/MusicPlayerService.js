import { useUserStore } from "@/store/modules/user";

export default class MusicPlayerService {
  constructor() {
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