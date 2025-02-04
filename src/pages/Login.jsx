import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogHeader from "./components/LogHeader";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import CryptoJS from "crypto-js";

const SECRET_KEY = "MySuperSecretKey";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        const token = userData?.token;
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            navigate("/Profile");
          } else {
            localStorage.removeItem("userData");
          }
        }
      } catch {
        localStorage.removeItem("userData");
      }
    }
  }, [navigate]);

  function handleChange(e) {
    setError(null);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "http://64.23.184.122:2001/api/auth/login",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, fullName } = res.data;
      if (!token) throw new Error("لم يتم استلام توكن صالح");
      // console.log(token);

      const decoded = jwtDecode(token);
      if (!decoded.id) throw new Error("التوكن غير صالح");

      const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
      const encryptedName = CryptoJS.AES.encrypt(
        fullName,
        SECRET_KEY
      ).toString();

      localStorage.setItem(
        "userData",
        JSON.stringify({ token: encryptedToken, fullName: encryptedName })
      );
      navigate("/Profile");
    } catch (err) {
      setError(err.res?.data?.message || "خطأ في التسجيل");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <LogHeader name="تسجيل الدخول" />
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-center">
              {error}
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="البريد الإلكتروني"
              className="w-full p-3 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-secondary-lighter"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              className="w-full p-3 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-secondary-lighter"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-secondary-lighter hover:bg-secondary-darker text-white p-3 rounded-md transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                </svg>
                جاري التحميل...
              </span>
            ) : (
              "دخول"
            )}
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600 mb-4">ليس لديك حساب؟</p>
          <button
            onClick={() => navigate("/Register")}
            className="w-full bg-secondary-lighter hover:bg-secondary-darker text-white p-2 rounded-md transition duration-200"
          >
            سجل حسابك الآن
          </button>
        </div>
      </div>
    </div>
  );
}
