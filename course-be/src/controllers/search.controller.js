import SearchService from "../services/search.service.js";

class SearchController {
  constructor() {
    this.service = new SearchService();
  }

  async searchAll(req, res) {
    const { query } = req.query;
    const results = await this.service.searchAll(query);
    res.json(results);
  }
}

export default new SearchController();
