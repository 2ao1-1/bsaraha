import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Shield, Loader2 } from "lucide-react";
import PasswordInput from "../../components/common/PasswordInput";
import TextInput from "../../components/common/TextInput";
import useAdminAuth from "../../hooks/useAdminAuth";
import AdminAuthCard from "./AdminAuthCard";
import AdminHeader from "./AdminHeader";
import AdminSecurityNotice from "./AdminSecurityNotice";
import AdminFooter from "./AdminFooter";

export default function AdminLoginForm({
  onSuccessNavigate = "/admin/dashboard",
}) {
  const { loading, error, login, setError } = useAdminAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("يرجى ملء جميع الحقول!");
      return;
    }

    const result = await login(formData.email.trim(), formData.password);
    if (result.success) {
      window.location.href = onSuccessNavigate;
    }
  };

  return (
    <AdminAuthCard>
      <AdminHeader />

      <div className="-mt-16">
        <div className="w-20 h-20 mx-auto flex items-center justify-center mb-4">
          <Shield size={40} className="text-white" />
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <TextInput
          label="البريد الإلكتروني"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="admin@saraha.com"
          required
        />

        <PasswordInput
          value={formData.password}
          onChange={handleChange}
          placeholder="كلمة المرور"
          name="password"
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
             {error}
          </div>
        )}

        <AdminSecurityNotice />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              جاري تسجيل الدخول...
            </>
          ) : (
            <>
              <Shield size={20} />
              تسجيل الدخول
            </>
          )}
        </button>

        <AdminFooter />
      </motion.form>
    </AdminAuthCard>
  );
}

AdminLoginForm.propTypes = {
  onSuccessNavigate: PropTypes.string,
};
