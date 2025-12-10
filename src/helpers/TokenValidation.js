import { jwtDecode } from "jwt-decode";
import { getAdminToken, getUserToken } from "./LocalStorage";

export const isTokenValid = () => {
  try {
    const token = getUserToken() || getAdminToken();
    if (!token) return false;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
