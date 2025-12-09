import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

axiosClient.interceptors.request.use((config) => {
  const tmdbKey = localStorage.getItem("TMDb-Key"); // 로그인 시 저장된 키
  if (!config.params) config.params = {};
  if (tmdbKey) {
    config.params["api_key"] = tmdbKey;
  }
  config.params["language"] = "ko-KR";
  return config;
});

export default axiosClient;
