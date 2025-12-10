const storage = {
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  get: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  remove: (...keys) => keys.forEach((k) => localStorage.removeItem(k)),
};

export const saveUserData = (token, fullName, username, id) => {
  storage.set("UserToken", token);
  storage.set("UserData", { fullName, username, id });
};

export const getUserData = () => storage.get("UserData");
export const getUserToken = () => storage.get("UserToken");
export const clearUserData = () => storage.remove("UserData", "UserToken");

export const saveAdminData = (token) => storage.set("AdminToken", token);
export const getAdminData = () => storage.get("AdminData");
export const getAdminToken = () => storage.get("AdminToken");
export const clearAdminData = () => storage.remove("AdminData", "AdminToken");
