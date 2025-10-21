import SearchRepository from "../repositories/search.repository.js";

class SearchService {
  constructor() {
    this.repository = new SearchRepository();
  }

  searchAll(query) {
    return this.repository.searchAll(query);
  }
}

export default SearchService;
