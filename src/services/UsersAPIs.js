import { request } from "../helpers/ApiRequest";
import { callEndPoint } from "../helpers/AxiosInstance";

export const usersAPI = {
  getProfile: () => request(callEndPoint(true).get("/api/users/profile")),

  updateProfile: (firstName, lastName, bio) => {
    return request(
      callEndPoint(true).put("/api/users/profile", {
        firstName,
        lastName,
        bio,
      })
    );
  },

  updateUsername: (username) => {
    return request(callEndPoint(true).put("/api/users/username", { username }));
  },

  checkUsername: (username) => {
    return request(callEndPoint().get(`/api/users/check-username/${username}`));
  },

  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    return request(
      callEndPoint(true).post("/api/users/profile-picture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  },

  deleteProfilePicture: () => {
    return request(callEndPoint(true).delete("/api/users/profile-picture"));
  },

  getByUsername: (username) => {
    return request(callEndPoint().get(`/api/users/${username}`));
  },

  getPublicMessages: (username) => {
    return request(callEndPoint().get(`/api/users/${username}/messages`));
  },
};
