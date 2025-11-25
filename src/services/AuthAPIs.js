import { request } from "../helpers/ApiRequest";
import { callEndPoint } from "../helpers/AxiosInstance";

export const authAPI = {
  register: (firstName, lastName, email, password) => {
    return request(
      callEndPoint().post("/api/auth/register", {
        firstName,
        lastName,
        email,
        password,
      })
    );
  },

  login: (emailOrUsername, password) => {
    return request(
      callEndPoint().post("/api/auth/login", {
        email: emailOrUsername,
        password,
      })
    );
  },
};
