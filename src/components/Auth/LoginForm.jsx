import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import PasswordInput from "../../components/common/PasswordInput";
import useAuth from "../../hooks/useAuth";
import AuthCard from "./AuthCard";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";



export default function LoginForm() {
  const navigate = useNavigate();
  const { loading, login } = useAuth();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.emailOrUsername.trim() || !formData.password.trim()) {
      toast.error("يرجى ملء جميع الحقول!");
      return;
    }

    const result = await login(
      formData.emailOrUsername.trim(),
      formData.password
    );
    if (result.success) {
      toast.success("تم تسجيل الدخول بنجاح!");
      setTimeout(() => navigate("/profile", { replace: true }), 800);
    } else {
      toast.error(
        result.error?.message || "البريد/اسم المستخدم أو كلمة المرور غير صحيحة"
      );
    }
  };

  return (
    <AuthCard>
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <AuthHeader title="مرحباً بعودتك!" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            البريد الإلكتروني أو اسم المستخدم
          </label>
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="example@email.com أو username"
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          />
        </div>

        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          placeholder="كلمة المرور"
          name="password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              جاري تسجيل الدخول...
            </>
          ) : (
            "تسجيل الدخول"
          )}
        </button>

        <AuthFooter
          question="ليس لديك حساب؟"
          actionText="سجل الآن"
          actionTo="/register"
        />
      </motion.form>
    </AuthCard>
  );
}
