import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import CryptoJS from "crypto-js";
import { User } from "lucide-react";

import { GET_USER_MESSAGES, SECRET_KEY } from "./components/SecretKey";
import SparkButton from "./components/SparkButton";
import { ErrorMessage, SuccessMessage } from "./components/SucOrErr";

export default function Profile() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const eventSource = new EventSource(`/api/messages/stream/${userId}`);

      eventSource.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prev) => [newMessage, ...prev]);
      };

      return () => eventSource.close();
    }
  }, [userId]);

  useEffect(() => {
    async function getUserData() {
      const storedUserData = localStorage.getItem("userData");

      if (!storedUserData) {
        navigate("/Login");
        return;
      }

      try {
        const parsedData = JSON.parse(storedUserData);

        const decryptedToken = CryptoJS.AES.decrypt(
          parsedData.token,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        const decryptedName = CryptoJS.AES.decrypt(
          parsedData.fullName,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        setUserData({
          fullName: decryptedName,
          token: decryptedToken,
        });

        if (decryptedToken) {
          const decodedToken = jwtDecode(decryptedToken);
          setUserId(decodedToken.id);
        } else {
          console.error("❌ No token found.");
          navigate("/Login");
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
        navigate("/Login");
      }
    }
    getUserData();
  }, [navigate]);

  useEffect(() => {
    if (userData?.token) {
      fetchMessages();
    }
  }, [userData?.token]);

  async function fetchMessages() {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(GET_USER_MESSAGES, {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
          Accept: "application/json",
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
      setMessages([]);
      setError(null);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("userData");
    navigate("/Login");
  }

  const shareUrl = `${window.location.origin}/#/send-message/${userId}`;
  // function shareProfile() {
  //   navigator.clipboard.writeText(shareUrl);
  //   setSuccess("تم نسخ الرابط بنجاح!");
  //   setInterval(() => {
  //     setSuccess("");
  //   }, 2000);
  // }
  function shareProfile() {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand("copy");
        setSuccess("تم نسخ الرابط بنجاح!");
      } catch (err) {
        setError("فشل في نسخ الرابط");
        console.error("Copy failed:", err);
      }

      document.body.removeChild(textArea);
    } catch (error) {
      console.error("Share error:", error);
      setError("حدث خطأ أثناء مشاركة الرابط");
    }

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-b bg-primary-darker p-4 mx-auto font-body"
    >
      <div className="container mx-auto">
        <div className="grid justify-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid md:grid-cols-2 gap-4 justify-center items-center mb-6 p-6 bg-primary-main rounded-lg shadow-lg"
          >
            <UserInfo name={userData?.fullName} />
            <div className=" flex flex-col justify-center items-center">
              <div className="p-4 bg-primary-darker rounded-md text-center">
                {shareUrl}
              </div>
              <div className="space-y-2">
                <div className="flex gap-4 mt-6">
                  <CopyURL shareProfile={shareProfile} loading={loading} />
                  <LogOutBtn handleLogout={handleLogout} loading={loading} />
                </div>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {success && <SuccessMessage>{success}</SuccessMessage>}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h3 className="text-3xl font-bold mb-6 text-secondary-lighter">
              الرسائل المستلمة
            </h3>
            <SparkButton
              onClick={fetchMessages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary-lighter hover:bg-secondary-darker text-white px-6 py-2 rounded-lg transition-colors duration-200 mb-6"
            >
              <motion.button>🔄 تحديث يدوي</motion.button>
            </SparkButton>

            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
              />
            ) : (
              <AnimatePresence>
                {messages.length > 0 ? (
                  <ReceivedMessages messages={messages} />
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-text-secondary text-lg"
                  >
                    لا توجد رسائل حتى الآن
                  </motion.p>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function UserInfo({ name }) {
  return (
    <div className=" flex flex-col justify-center items-center">
      <User
        size={80}
        className="rounded-full bg-text-light/20 border-secondary-lighter border-2 text-secondary-lighter mb-8"
      />
      <h2 className="text-4xl font-bold mb-4 text-secondary-lighter font-headers">
        {name}
      </h2>
    </div>
  );
}

function CopyURL({ loading, shareProfile }) {
  return (
    <SparkButton
      type="submit"
      className="bg-secondary-lighter hover:bg-secondary-main text-white px-6 py-2 rounded-lg transition-colors duration-200"
      disabled={loading}
      onClick={shareProfile}
    >
      <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        نسخ الرابط
      </motion.span>
    </SparkButton>
  );
}

function LogOutBtn({ loading, handleLogout }) {
  return (
    <SparkButton
      type="submit"
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
      disabled={loading}
      onClick={handleLogout}
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        تسجيل خروج
      </motion.span>
    </SparkButton>
  );
}

function ReceivedMessages({ messages }) {
  return (
    <motion.div className="space-y-4 mx-auto">
      {messages.map((message) => (
        <motion.div
          key={message._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-secondary-darker/20 p-6 rounded-lg shadow-md border border-accent-lighter/20 relative"
        >
          <p className="text-text-primary text-lg">{message.content}</p>
          <p className="text-sm text-text-secondary float-end">
            {new Date(message.createdAt).toLocaleString("ar-EG", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
