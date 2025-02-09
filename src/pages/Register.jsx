import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { motion } from "framer-motion";
import axios from "axios";

import SparkButton from "./components/SparkButton.jsx";
import CloseBtn from "./components/CloseBtn";
import { POST_NEWUSER } from "./components/Apis";
import { ErrorMessage, SuccessMessage } from "./components/SucOrErr.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (Object.values(formData).some((value) => !value.trim())) {
      setError("يرجى ملء جميع الحقول!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(
        POST_NEWUSER,
        { ...formData },
        {
          headers: { "Content-Type": "application/json", accept: " */*" },
        }
      );

      setSuccess("تم التسجيل بنجاح!");

      localStorage.setItem("userData", JSON.stringify(res.data));

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.response) {
        console.error("❌ Server Error:", err.response.data);
        setError(err.response.data.message || "حدث خطأ أثناء التسجيل!");
      } else {
        console.error("❌ Network Error:", err.message);
        setError("تعذر الاتصال بالسيرفر!");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-secondary-darker/90 to-secondary-darker/75 font-body px-4">
      <motion.div
        className="text-center pb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-headers text-primary-main text-5xl md:text-7xl md:px-8 drop-shadow-lg">
          إنشاء حساب
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

        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value], index) => (
            <motion.div
              key={key}
              className={
                key === "email" || key === "password" ? "md:col-span-2" : ""
              }
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
            >
              <label
                htmlFor={key}
                className="text-text-secondary block mb-2 text-lg"
              >
                {key === "firstName"
                  ? "الاسم الأول"
                  : key === "lastName"
                  ? "الاسم الأخير"
                  : key === "email"
                  ? "البريد الإلكتروني"
                  : "كلمة المرور"}
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
        </div>

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
            to="/Login"
            className="text-secondary-lighter font-bold transition-colors duration-300 hover:text-secondary-darker"
          >
            سجل دخول هنا
          </Link>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && <SuccessMessage>{success}</SuccessMessage>}
      </motion.form>
    </div>
  );
}
