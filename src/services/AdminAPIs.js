import { request } from "../helpers/ApiRequest";
import { callEndPoint } from "../helpers/AxiosInstance";

export const adminAPI = {
  login: (email, password) => {
    return request(
      callEndPoint(false, false).post("/admin/login", { email, password })
    );
  },

  getStats: () => request(callEndPoint(false, true).get("/admin/stats")),

  getUsers: (page = 1, limit = 20, search = "") => {
    const params = new URLSearchParams({ page, limit });
    if (search) params.append("search", search);
    return request(callEndPoint(false, true).get(`/admin/users?${params}`));
  },

  getUserById: (userId) => {
    return request(callEndPoint(false, true).get(`/admin/users/${userId}`));
  },

  deleteUser: (userId) => {
    return request(callEndPoint(false, true).delete(`/admin/users/${userId}`));
  },

  promoteUser: (userId) => {
    return request(
      callEndPoint(false, true).patch(`/admin/users/${userId}/promote`)
    );
  },

  demoteUser: (userId) => {
    return request(
      callEndPoint(false, true).patch(`/admin/users/${userId}/demote`)
    );
  },

  getMessages: (page = 1, limit = 50) => {
    return request(
      callEndPoint(false, true).get(
        `/admin/messages?page=${page}&limit=${limit}`
      )
    );
  },

  deleteMessage: (messageId) => {
    return request(
      callEndPoint(false, true).delete(`/admin/messages/${messageId}`)
    );
  },
};
