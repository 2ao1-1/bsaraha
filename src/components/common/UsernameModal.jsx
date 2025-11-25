import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Sparkles } from "lucide-react";
import PropTypes from "prop-types";
import { usersAPI } from "../../services/UsersAPIs";

export default function UsernameModal({
  isOpen,
  onClose,
  currentUsername,
  onSuccess,
}) {
  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setIsAvailable(null);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!username || username.length < 3) {
      setIsAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsChecking(true);
      const result = await usersAPI.checkUsername(username);
      if (result.success) {
        setIsAvailable(result.data.available);
      }
      setIsChecking(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const handleChange = (e) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(val);
    setError(null);
  };

  const handleSave = async () => {
    if (!isAvailable || username.length < 3) return;

    setIsSaving(true);
    setError(null);

    const result = await usersAPI.updateUsername(username);

    if (result.success) {
      onSuccess(username);
      onClose();
    } else {
      setError(result.error?.message || "فشل في تحديث اسم المستخدم");
    }

    setIsSaving(false);
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
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              اختر اسم المستخدم
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              يمكنك تغييره مرة واحدة فقط!
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">الاسم الحالي:</p>
            <p className="font-mono text-gray-800">@{currentUsername}</p>
          </div>

          <div className="relative mb-4">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              @
            </div>
            <input
              type="text"
              value={username}
              onChange={handleChange}
              placeholder="username_new"
              maxLength={30}
              className={`w-full px-4 py-3 pr-10 rounded-lg border-2 outline-none transition-all
                ${isAvailable === true ? "border-green-500" : ""}
                ${isAvailable === false ? "border-red-500" : ""}
                ${
                  isAvailable === null
                    ? "border-gray-200 focus:border-blue-500"
                    : ""
                }
              `}
            />

            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {isChecking && (
                <Loader2 size={20} className="animate-spin text-blue-500" />
              )}
              {!isChecking && isAvailable === true && (
                <Check size={20} className="text-green-500" />
              )}
              {!isChecking && isAvailable === false && (
                <X size={20} className="text-red-500" />
              )}
            </div>
          </div>

          {username.length >= 3 && (
            <p
              className={`text-sm mb-4 ${
                isAvailable ? "text-green-600" : "text-red-600"
              }`}
            >
              {isAvailable ? "✓ الاسم متاح!" : "✗ الاسم مستخدم بالفعل"}
            </p>
          )}

          <div className="bg-blue-50 rounded-lg p-3 mb-4 text-xs text-blue-800">
            <p className="font-medium mb-1">📝 القواعد:</p>
            <ul className="space-y-0.5">
              <li>• 3-30 حرف (إنجليزي صغير، أرقام، _)</li>
              <li>• لا يمكن تغييره مرة أخرى!</li>
            </ul>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
            >
              لاحقاً
            </button>
            <button
              onClick={handleSave}
              disabled={!isAvailable || isSaving || username.length < 3}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium
                       hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                "حفظ"
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

UsernameModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  currentUsername: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
};
