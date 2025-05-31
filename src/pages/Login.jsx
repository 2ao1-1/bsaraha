import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

import CloseBtn from "../components/CloseBtn";
import { GET_EXISTUSER } from "../components/Apis";
import { ErrorMessage, SuccessMessage } from "../components/SucOrErr";
import SubmitBtn from "../components/SubmitBtn";
import RedirectBtn from "../components/RedirectBtn";
import FormHeader from "../components/FormHeader";
import LoginForm from "../components/LoginForm";

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
            navigate("/profile");
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
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "خطأ في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-600 to-gray-700 font-body p-4">
      <FormHeader text="تسجيل دخول" />

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

        <LoginForm formData={formData} handleChange={handleChange} />

        <SubmitBtn loading={loading} />

        <RedirectBtn
          text="ليس لديك حساب؟"
          to="/register"
          forwardText="سجل الآن"
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && <SuccessMessage>{success}</SuccessMessage>}
      </motion.form>
    </div>
  );
}
