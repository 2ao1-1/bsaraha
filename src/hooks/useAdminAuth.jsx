import { useState } from "react";
import { adminAPI } from "../services/AdminAPIs";
import { saveAdminData } from "../helpers/LocalStorage";

export default function useAdminAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = await adminAPI.login(email, password);
      if (result.success) {
        const responseData = result.data?.data || result.data;
        const { token } = responseData;
        if (!token) {
          setError("لم يتم استلام Token من السيرفر");
          return { success: false, error: new Error("missing token") };
        }
        saveAdminData(token);
        return { success: true, data: responseData };
      }
      setError(result.error?.message || "بيانات الدخول غير صحيحة");
      return { success: false, error: result.error };
    } catch (err) {
      setError("حدث خطأ غير متوقع");
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login, setError };
}
