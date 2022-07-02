import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

instance.interceptors.request.use(config => {
  const tokenName = localStorage.getItem("tokenName");
  const tokenValue = localStorage.getItem("tokenValue");
  if (tokenName && tokenValue) {
    config.headers[tokenName] = tokenValue;
  }
  return config;
});

export default instance;
