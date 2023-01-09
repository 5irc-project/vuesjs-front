import axios from "axios";

// axios decorator (in case of changes)
export default class Http {
  constructor(baseURL = "", timeout = 10000, headers = undefined) {
    if (baseURL === "") {
      return;
    }

    this.http = axios.create({
      baseURL,
      timeout,
      headers,
    });
  }

  get(path, parameters = {}) {
    return this.http.get(path, parameters);
  }
  post(path, data = {}, parameters = {}) {
    return this.http.post(path, data, parameters);
  }
  delete(path, config = {}) {
    return this.http.delete(path, config);
  }
  patch(path, data = {}, parameters = {}) {
    return this.http.patch(path, data, parameters);
  }
  put(path, data = {}, parameters = {}) {
    return this.http.put(path, data, parameters);
  }

  toUrl(params) {
    return `?${new URLSearchParams(params).toString()}`;
  }
}
