import { useState } from "react";
import { useParams } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { POST_MESSAGES_TOUSER } from "../components/Apis";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

export default function SendMessage() {
  const { userName, userId } = useParams();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  const storedData = localStorage.getItem("userData");
  console.log(storedData);

  function showStatusMessage(text, type) {
    setStatus({ text, type });
    setShowStatus(true);
    setTimeout(() => {
      setShowStatus(false);
      setStatus("");
    }, 3000);
  }

  async function sendMessage() {
    if (!message.trim()) {
      showStatusMessage("⚠️ الرسالة لا يمكن أن تكون فارغة!", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${POST_MESSAGES_TOUSER}${userId}`,
        { content: message },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = await res.data;

      showStatusMessage(`✅ تم إرسال الرسالة بنجاح!`, `success : ${data}`);
      setMessage("");
    } catch (error) {
      console.error("❌ API Error:", error);
      const errorMessage =
        error.response?.data?.message || "❌ حدث خطأ أثناء الإرسال.";
      showStatusMessage(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-600 to-gray-700 text-text-primary ">
      {storedData ? (
        <Navbar>
          <Menu userView="user" />
        </Navbar>
      ) : (
        <Navbar>
          <Menu />
        </Navbar>
      )}

      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          className="bg-primary-main p-6 rounded-lg shadow-lg w-full max-w-md relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {userName && (
              <motion.div
                className="mb-6 p-4 text-center rounded bg-primary-darker/30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-sm font-semibold text-text-primary/80">
                  👤 إرسال رسالة إلى:
                </h3>
                <p className="text-3xl font-headers text-gra-900 mt-2">
                  {userName.replace("-", " ").toLocaleUpperCase()}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.textarea
            className="w-full p-4 rounded bg-primary-darker text-text-primary focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-text-primary/50 resize-none"
            rows="4"
            placeholder="✍️ اكتب رسالتك هنا..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          />

          <motion.button
            onClick={sendMessage}
            disabled={loading}
            className={`mt-4 ${
              loading
                ? "bg-gray-600 cursor-not-allowed opacity-70"
                : "bg-gray-600 hover:bg-gray-700"
            } text-primary-main px-6 py-3 rounded-lg w-full transition-all duration-300 font-semibold tracking-wide`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  ⏳
                </motion.span>
                جاري الإرسال...
              </span>
            ) : (
              "🚀 إرسال"
            )}
          </motion.button>

          <AnimatePresence>
            {showStatus && status && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`mt-4 p-3 rounded-lg text-center ${
                  status.type === "error"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-green-500/10 text-green-400"
                }`}
              >
                {status.text}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
