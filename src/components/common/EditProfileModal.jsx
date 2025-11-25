import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, User } from "lucide-react";
import PropTypes from "prop-types";
import { authAPI } from "../../services/AuthAPIs";

export default function EditProfileModal({
  isOpen,
  onClose,
  currentData,
  onSuccess,
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && currentData) {
      const nameParts = currentData.fullName?.split(" ") || ["", ""];
      setFormData({
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        bio: currentData.bio || "",
      });
      setError(null);
    }
  }, [isOpen, currentData]);

  const handleChange = (e) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("الاسم الأول والأخير مطلوبان");
      setLoading(false);
      return;
    }

    try {
      const result = await authAPI.updateProfile(
        formData.firstName.trim(),
        formData.lastName.trim(),
        formData.bio.trim()
      );

      if (result.success) {
        const profile = result.data?.data || result.data;
        onSuccess({
          fullName: `${formData.firstName} ${formData.lastName}`,
          bio: formData.bio,
          ...profile,
        });
        onClose();
      } else {
        setError(result.error?.message || "فشل تحديث البيانات");
      }
    } catch {
      setError("حدث خطأ غير متوقع");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">تعديل البيانات</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         outline-none transition-all"
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
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نبذة عنك (اختياري)
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="اكتب نبذة مختصرة عنك..."
                rows={3}
                maxLength={200}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         outline-none transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.bio.length} / 200
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
              >
              {error}
              </motion.div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 
                         rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                         rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all 
                         flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ التعديلات"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentData: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
};
