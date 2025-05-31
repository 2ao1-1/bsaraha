import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import axios from "axios";

import CloseBtn from "../components/CloseBtn.jsx";

import { POST_NEWUSER } from "../components/Apis.jsx";
import { ErrorMessage, SuccessMessage } from "../components/SucOrErr.jsx";
import SubmitBtn from "../components/SubmitBtn.jsx";
import RedirectBtn from "../components/RedirectBtn.jsx";
import FormHeader from "../components/FormHeader.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

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
        navigate("/profile");
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-600 to-gray-700 font-body px-4">
      <FormHeader text={"انشاء حساب"} />

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

        {/*  Register form */}
        <RegisterForm formData={formData} handleChange={handleChange} />

        {/* submit btn */}
        <SubmitBtn loading={loading} />

        {/* login link */}
        <RedirectBtn
          text={"لديك حساب؟"}
          to={"/Login"}
          forwardText={"سجل دخول هنا"}
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {success && <SuccessMessage>{success}</SuccessMessage>}
      </motion.form>
    </div>
  );
}
