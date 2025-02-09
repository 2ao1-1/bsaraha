import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

import CloseBtn from "./components/CloseBtn";
import SparkButton from "./components/SparkButton";
import { GET_EXISTUSER } from "./components/Apis";
import { ErrorMessage, SuccessMessage } from "./components/SucOrErr";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await axios.post(GET_EXISTUSER, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, fullName } = res.data;
      if (!token) throw new Error("لم يتم استلام توكن صالح");

      const decoded = jwtDecode(token);
      if (!decoded.id) throw new Error("التوكن غير صالح");

      localStorage.setItem("userData", JSON.stringify({ token, fullName }));

      setSuccess("تم تسجيل الدخول بنجاح!");
      setTimeout(() => {
        navigate("/Profile");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "خطأ في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-secondary-darker/90 to-secondary-darker/75 font-body p-4">
      <motion.div
        className="text-center pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-headers text-primary-main text-5xl md:text-7xl md:px-8 drop-shadow-lg">
          تسجيل الدخول
        </h2>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-primary-lighter/95 backdrop-blur-sm rounded-lg p-6 m-4 grid gap-5 w-full max-w-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="relative w-full">
          <CloseBtn />
        </div>

        {Object.entries(formData).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: key === "email" ? 0.3 : 0.4 }}
          >
            <label
              htmlFor={key}
              className="text-text-secondary block mb-2 text-lg"
            >
              {key === "email" ? "البريد الإلكتروني" : "كلمة المرور"}
            </label>
            <input
              type={key === "password" ? "password" : "text"}
              name={key}
              id={key}
              value={value}
              onChange={handleChange}
              className="w-full p-3 bg-primary-darker text-text-primary rounded-md outline-none transition-all duration-300 focus:bg-secondary-lighter/25 focus:ring-2 focus:ring-secondary-lighter"
              required
            />
          </motion.div>
        ))}

        <SparkButton
          type="submit"
          className="mt-4 bg-secondary-lighter text-primary-main p-3 w-full rounded-md font-bold text-lg transition-all duration-300 hover:bg-secondary-darker hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="inline-flex items-center">
              جاري التسجيل...
              <motion.span
                className="mr-2 h-4 w-4 rounded-full border-2 border-primary-main border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </span>
          ) : (
            "تسجيل"
          )}
        </SparkButton>

        <div className="text-center text-text-primary text-lg">
          <span>لديك حساب؟ </span>
          <Link
            to="/register"
            className="text-secondary-lighter font-bold transition-colors duration-300 hover:text-secondary-darker"
          >
            إنشاء حساب هنا
          </Link>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && <SuccessMessage>{success}</SuccessMessage>}
      </motion.form>
    </div>
  );
}
