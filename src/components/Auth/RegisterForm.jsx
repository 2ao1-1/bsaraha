import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import PasswordInput from "../../components/common/PasswordInput";
import UsernameModal from "../../components/common/UsernameModal";
import useAuth from "../../hooks/useAuth";
import AuthCard from "./AuthCard";
import AuthHeader from "./AuthHeader";
import AuthFooter from "./AuthFooter";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { loading, register } = useAuth();

  const [registeredUsername, setRegisteredUsername] = useState("");
  const [showUsernameModal, setShowUsernameModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(formData).some((v) => !v.trim())) {
      toast.error("يرجى ملء جميع الحقول!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
      return;
    }

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(formData.email)) {
      toast.error("البريد الإلكتروني غير صحيح");
      return;
    }

    const result = await register(
      formData.firstName.trim(),
      formData.lastName.trim(),
      formData.email.trim(),
      formData.password
    );
    if (result.success) {
      toast.success("تم التسجيل بنجاح!");
      const responsData = result.data;
      setRegisteredUsername(responsData.username);
      setTimeout(() => setShowUsernameModal(true), 800);
    } else {
      toast.error(result.error?.message || "حدث خطأ أثناء التسجيل");
    }
  };

  const handleUsernameSuccess = (newUsername) => {
    const userData = JSON.parse(localStorage.getItem("UserData"));
    if (userData) {
      userData.username = newUsername;
      localStorage.setItem("UserData", JSON.stringify(userData));
    }
    navigate("/profile", { replace: true });
  };

  const handleModalClose = () => {
    setShowUsernameModal(false);
    navigate("/profile", { replace: true });
  };

  return (
    <>
      <AuthCard>
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <AuthHeader title="إنشاء حساب جديد" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الاسم الأول
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="أحمد"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم العائلة
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="محمد"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          <PasswordInput
            value={formData.password}
            onChange={handleChange}
            placeholder="كلمة المرور"
            minLength={6}
            name="password"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
            💡 سيتم إنشاء اسم مستخدم تلقائي، ويمكنك تغييره مرة واحدة بعد التسجيل
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                جاري التسجيل...
              </>
            ) : (
              "إنشاء حساب"
            )}
          </button>

          <AuthFooter
            question="لديك حساب؟"
            actionText="سجل دخول"
            actionTo="/login"
          />
        </motion.form>
      </AuthCard>

      <UsernameModal
        isOpen={showUsernameModal}
        onClose={handleModalClose}
        currentUsername={registeredUsername}
        onSuccess={handleUsernameSuccess}
      />
    </>
  );
}
