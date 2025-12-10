import axios from "axios";
import {
  clearAdminData,
  clearUserData,
  getAdminToken,
  getUserToken,
} from "./LocalStorage";

export const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL,
  timeout: 15000,
});

export const callEndPoint = (needAuth = false, isAdmin = false) => {
  const config = {
    baseURL: api.defaults.baseURL,
    headers: { "Content-Type": "application/json" },
  };

  if (needAuth || isAdmin) {
    const token = isAdmin ? getAdminToken() : getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  const instance = axios.create(config);
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        if (isAdmin) {
          clearAdminData();
          window.location.href = "/admin/login";
        } else {
          clearUserData();
          window.location.href = "/login";
        }
      }
      return Promise.reject(err);
    }
  );
  return instance;
};
