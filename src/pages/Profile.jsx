import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { User } from "lucide-react";
import { jwtDecode } from "jwt-decode";

import { GET_USER_MESSAGES } from "../components/Apis";
import SparkButton from "../components/SparkButton";
import { ErrorMessage, SuccessMessage } from "../components/SucOrErr";

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
        navigate("/login");
        return;
      }

      try {
        const parsedData = JSON.parse(storedUserData);

        const token = parsedData.token;

        const fullName = parsedData.fullName;

        setUserData({
          fullName,
          token,
        });

        if (token) {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);
        } else {
          console.error("❌ No token found.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
        navigate("/login");
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
    navigate("/");
  }

  const userName = `${userData?.fullName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")}`;

  const shareUrl = `${window.location.origin}/#/${userName}/${userId}`;
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
      className="min-h-screen bg-gradient-to-b bg-gray-400 p-4 mx-auto font-body"
    >
      <div className="container mx-auto">
        <div className="grid justify-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid md:grid-cols-2 gap-4 justify-center items-center mb-6 p-6 bg-gray-200 rounded-lg shadow-lg"
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
            <h3 className="text-3xl font-bold mb-6 text-gray-800">
              الرسائل المستلمة
            </h3>
            <SparkButton
              onClick={fetchMessages}
              className="bg-gray-500 hover:bg-gray-darker text-white px-6 py-2 rounded-lg transition-colors duration-200 mb-6"
              disabled={loading}
            >
              🔄 تحديث يدوي
            </SparkButton>

            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-12 h-12 border-4 border-gray-500 border-t-transparent rounded-full mx-auto"
              />
            ) : (
              <AnimatePresence>
                {messages.length > 0 ? (
                  <ReceivedMessages messages={messages} />
                ) : (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-gray-600 text-lg"
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

// eslint-disable-next-line react/prop-types
function UserInfo({ name }) {
  return (
    <div className=" flex flex-col justify-center items-center">
      <User
        size={80}
        className="rounded-full bg-gray-200 text-gray-700 border-gray-500 border-2  mb-8"
      />
      <h2 className="text-4xl mb-4 text-gray-800 font-headers">{name}</h2>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function CopyURL({ loading, shareProfile }) {
  return (
    <SparkButton
      onClick={shareProfile}
      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
      disabled={loading}
    >
      نسخ الرابط
    </SparkButton>
  );
}

// eslint-disable-next-line react/prop-types
function LogOutBtn({ loading, handleLogout }) {
  return (
    <SparkButton
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200"
      disabled={loading}
    >
      تسجيل خروج
    </SparkButton>
  );
}

// eslint-disable-next-line react/prop-types
function ReceivedMessages({ messages }) {
  return (
    <motion.div className="space-y-4 mx-auto">
      {messages.map((message) => (
        <motion.div
          key={message._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gray-200 p-4 rounded-lg shadow-md border border-gray-600 relative flex justify-between flex-wrap gap-5"
        >
          <p className="text-text-primary text-lg">{message.content}</p>
          <p className="text-sm text-text-gray">
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
