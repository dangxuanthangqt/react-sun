import axios from "axios";

class axiosService {
  constructor() {
    const instance = axios.create();

    instance.defaults.baseURL = "http://localhost:4000";

    this.instance = instance;
  }

  get = (url) => {
    return this.instance.get(url);
  };
  post = (url, data) => {
    return this.instance.post(url, data);
  };
  put = (url, data) => {
    return this.instance.put(url, data);
  };
  delete = (url, data) => {
    return this.instance.delete(url, data);
  };
  patch = (url, data) => {
    return this.instance.patch(url, data);
  };
}
export default new axiosService();
