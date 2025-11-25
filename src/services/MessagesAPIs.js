import { request } from "../helpers/ApiRequest";
import { callEndPoint } from "../helpers/AxiosInstance";

export const messagesAPI = {
  getMyMessages: () => request(callEndPoint(true).get("/api/messages")),

  sendMessage: (username, content) => {
    return request(
      callEndPoint().post(`/api/messages/to/${username}`, { content })
    );
  },

  deleteMessage: (id) =>
    request(callEndPoint(true).delete(`/api/messages/${id}`)),
  replyToMessage: (id, content) => {
    return request(
      callEndPoint(true).post(`/api/messages/${id}/reply`, { content })
    );
  },

  updateReply: (id, content) => {
    return request(
      callEndPoint(true).put(`/api/messages/${id}/reply`, { content })
    );
  },

  deleteReply: (id) => {
    return request(callEndPoint(true).delete(`/api/messages/${id}/reply`));
  },

  showInPublic: (id) => {
    return request(callEndPoint(true).patch(`/api/messages/${id}/public`));
  },
};
