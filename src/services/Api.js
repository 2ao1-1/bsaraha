import axios from "axios";
import { jwtDecode } from "jwt-decode";

// export const BASE_URL = import.meta.env.VITE_API_URL;
export const BASE_URL = "https://bsaraha-api.2ao1.space/api";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  PROFILE: `${BASE_URL}/auth/profile`,
  USERS: `${BASE_URL}/users`,
  MESSAGES: `${BASE_URL}/messages`,
};

export function signVerify() {
  const storedUserData = localStorage.getItem("userData");

  if (storedUserData) {
    try {
      const userData = JSON.parse(storedUserData);
      const token = userData?.token;

      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            return { redirect: "/profile" };
          } else {
            localStorage.removeItem("userData");
          }
        } catch (err) {
          localStorage.removeItem("userData");
          console.error("Invalid token:", err);
        }
      }
    } catch (err) {
      localStorage.removeItem("userData");
      console.error("Error parsing user data:", err);
    }
  }

  return null;
}

export const getAuthToken = () => {
  try {
    const userData = localStorage.getItem("userData");
    if (!userData) return null;

    const parsedData = JSON.parse(userData);
    return parsedData?.token || null;
  } catch (err) {
    console.error("Error getting auth token:", err);
    return null;
  }
};

const createAxiosInstance = (needsAuth = true) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (needsAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return axios.create({
    baseURL: BASE_URL,
    headers,
  });
};

const handleAxiosRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw {
      status: error.response?.status || 500,
      statusText: error.response?.statusText || "Internal Server Error",
      message: error.response?.data?.message || "حدث خطأ أثناء معالجة الطلب",
      data: error.response?.data || {},
    };
  }
};

export const authAPI = {
  login: async (credentials) => {
    const api = createAxiosInstance(false);
    return handleAxiosRequest(api.post("/auth/login", credentials));
  },

  register: async (userData) => {
    const api = createAxiosInstance(false);
    return handleAxiosRequest(api.post("/auth/register", userData));
  },

  getProfile: async () => {
    const api = createAxiosInstance(true);
    return handleAxiosRequest(api.get("/messages/"));
  },
};

export const messagesAPI = {
  getUserProfile: async (userId) => {
    const api = createAxiosInstance(false);
    return handleAxiosRequest(api.get(`/users/${userId}`));
  },

  sendMessage: async (userId, message) => {
    const api = createAxiosInstance(true);
    return handleAxiosRequest(api.post(`/messages/${userId}`, { message }));
  },

  getReceivedMessages: async () => {
    const api = createAxiosInstance(true);
    return handleAxiosRequest(api.get("/messages/"));
  },

  // deleteMessage: async (messageId) => {
  //   const api = createAxiosInstance(true);
  //   return handleAxiosRequest(api.delete(`/messages/${messageId}`));
  // },
};
