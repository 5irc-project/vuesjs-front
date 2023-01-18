import ApiService from "@/services/ApiService";
import { recommendationServiceKey } from "@/serviceKeys";

const controller = "api/Music/Recommendation";

export default class RecommendationService extends ApiService {
  constructor() {
    super(controller, recommendationServiceKey, document.env.VUE_APP_API_RECOMMENDATION_BASE_URL);
  }

  async getRecommendations(tracks) {
    const { data } = await this.post(``, tracks);
    return data;
  }
}
