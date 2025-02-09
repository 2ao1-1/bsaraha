import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

<<<<<<< HEAD
import { POST_MESSAGES_TOUSER } from "./components/Apis";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
=======
import { POST_MESSAGES_TOUSER } from "./components/SecretKey";
import { Logo } from "./components/Navbar";
import { Link } from "react-router-dom";
>>>>>>> 5aed53606338ad1761d563e05098db8e5ebb6538

export default function SendMessage() {
  const { userId } = useParams();
  const [recipientName, setRecipientName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const fullName = parsedData.fullName;

        setRecipientName(fullName || "مستخدم غير معروف");
      } catch (error) {
        console.error("خطأ في فك التشفير:", error);
        setRecipientName("مستخدم غير معروف");
      }
    } else {
      setRecipientName("مستخدم غير معروف");
    }
  }, []);

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
    <div className="bg-gradient-to-b from-secondary-darker/90 to-secondary-darker/75 text-text-primary ">
<<<<<<< HEAD
      <Navbar>
        <Menu />
      </Navbar>

=======
      <motion.header
        className="bg-secondary-lighter"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <div className="flex space-x-4 p-4 text-primary-main justify-between items-center max-w-7xl mx-auto">
          <Logo />
          <nav className="hidden md:flex justify-center">
            <MenuLinks name={"الصفحه الرئيسية"} path={"/"} />
          </nav>
        </div>
      </motion.header>
>>>>>>> 5aed53606338ad1761d563e05098db8e5ebb6538
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <motion.div
          className="bg-primary-main p-6 rounded-lg shadow-lg w-full max-w-md relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {recipientName && (
              <motion.div
                className="mb-6 p-4 text-center rounded bg-primary-darker/30"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h3 className="text-sm font-semibold text-text-primary/80">
                  👤 إرسال رسالة إلى:
                </h3>
                <p className="text-3xl font-headers text-secondary-lighter font-bold mt-2">
                  {recipientName}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.textarea
            className="w-full p-4 rounded bg-primary-darker text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary-lighter placeholder-text-primary/50 resize-none"
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
                ? "bg-secondary-main cursor-not-allowed opacity-70"
                : "bg-secondary-lighter hover:bg-secondary-darker"
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

function MenuLinks({ mobile }) {
  const links = [{ name: "الصفحة الرئيسية", path: "/" }];

  return (
    <ul
      className={`${
        mobile
          ? "flex flex-col space-y-2 py-2"
          : "flex flex-row gap-8 items-center"
      }`}
    >
      {links.map((link, index) => (
        <li
          key={index}
          className="p-2 rounded hover:bg-text-secondary/20 cursor-pointer"
        >
          <Link className="hover:underline block w-full" to={link.path}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
