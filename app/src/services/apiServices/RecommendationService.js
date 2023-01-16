import ApiService from "@/services/ApiService";
import { recommendationServiceKey } from "@/serviceKeys";

const controller = "api/Recommendation";

export default class RecommendationService extends ApiService {
  constructor() {
    super(controller, recommendationServiceKey, "https://localhost:7153");
  }

  async getRecommendations(tracks) {
    const { data } = await this.post(``, tracks);
    return data;
  }
}
