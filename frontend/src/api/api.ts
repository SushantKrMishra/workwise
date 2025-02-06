import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
  baseURL: "https://workwise-jel2.onrender.com/",
});

API.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
