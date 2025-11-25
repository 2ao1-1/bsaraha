import { useState } from "react";
import toast from "react-hot-toast";

import { authAPI } from "../services/AuthAPIs";
import { saveUserData } from "../helpers/LocalStorage";
import { jwtDecode } from "jwt-decode";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (emailOrUsername, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authAPI.login(emailOrUsername, password);
      if (result.success) {
        const responseData = result.data?.data || result.data;
        const { token, fullName, username } = responseData;
        const decoded = jwtDecode(token);
        saveUserData(token, fullName, username, decoded.id);
        return { success: true, data: responseData };
      }
      setError(result.error?.message || "خطأ في بيانات الدخول");
      return { success: false, error: result.error };
    } catch (err) {
      setError("حدث خطأ غير متوقع");
      toast.error("حدث خطأ في الشبكة. يرجى المحاولة لاحقاً");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authAPI.register(
        firstName,
        lastName,
        email,
        password
      );
      if (result.success) {
        const responseData = result.data?.data || result.data;
        const { token, fullName, username } = responseData;
        const decoded = jwtDecode(token);
        saveUserData(token, fullName, username, decoded.id);
        return { success: true, data: responseData };
      }
      setError(result.error?.message || "حدث خطأ أثناء التسجيل");
      return { success: false, error: result.error };
    } catch (err) {
      setError("حدث خطأ غير متوقع");
      toast.error("حدث خطأ في الشبكة. يرجى المحاولة لاحقاً");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login, register, setError };
}
