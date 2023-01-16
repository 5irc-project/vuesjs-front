import ApiService from "@/services/ApiService";
import { playlistServiceKey } from "@/serviceKeys";

const controller = "playlist";

export default class PlaylistService extends ApiService {
  constructor() {
    super(controller, playlistServiceKey);
  }

  async getMyPlaylists() {
    return new Promise((resolve) => {
      resolve([
        {
          imageSrc: "/images/image.PNG",
          title: "Title",
          description: "Description",
          id: 123,
          isGenerated: true
        },
        {
          imageSrc: "/images/image.PNG",
          title: "Title",
          description: "Description",
          id: 124,
          isGenerated: false
        },
        {
          imageSrc: "/images/image.PNG",
          title: "Title",
          description: "Description",
          id: 125,
          isGenerated: true
        },
        {
          imageSrc: "/images/image.PNG",
          title: "Title",
          description: "Description",
          id: 129,
          isGenerated: true
        },
        {
          imageSrc: "/images/image.PNG",
          title: "Title",
          description: "Description",
          id: 120,
          isGenerated: false
        },
        {
          imageSrc: "/images/image.PNG",
          title: "Title",
          description: "Description",
          id: 121,
          isGenerated: true
        },
      ]);
    });
  }

  getById(id) {
    return new Promise((resolve) => {
      resolve({
        imageSrc: "/images/image.PNG",
        title: "Title",
        description: "Description",
        id: id,
        isGenerated: true,
        musics: [
          {
            title: "Title",
            description: "Description",
            id: id,
          }
        ]
      });
    });
  }


  async getSeparatedPlaylists() {
    const playlists = await this.getMyPlaylists();

    const myPlaylists = playlists.filter(p => p.isGenerated === false);
    const generatedPlaylists = playlists.filter(p => p.isGenerated === true);

    return { myPlaylists, generatedPlaylists };
  }
}
