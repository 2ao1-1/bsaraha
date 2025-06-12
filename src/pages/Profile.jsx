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
  // const [deletingId, setDeletingId] = useState(null);

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

  // async function deleteMessage(messageId) {
  //   setDeletingId(messageId);
  //   setError(null);

  //   try {
  //     await axios.delete(`${GET_USER_MESSAGES}/${messageId}`, {
  //       headers: {
  //         Authorization: `Bearer ${userData?.token}`,
  //         Accept: "application/json",
  //       },
  //     });

  //     setMessages((prev) =>
  //       prev.filter((message) => message._id !== messageId)
  //     );

  //     setSuccess("تم حذف الرسالة بنجاح!");

  //     setTimeout(() => setSuccess(null), 2000);
  //   } catch (error) {
  //     console.log("Error deleting message:", error);
  //     setError("فشل في حذف الرسالة");

  //     setTimeout(() => setError(null), 3000);
  //   } finally {
  //     setDeletingId(null);
  //   }
  // }

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
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="md:grid md:grid-cols-2 gap-4 justify-center items-center mb-6 p-2 bg-gray-200 rounded-lg shadow-lg w-full"
        >
          <UserInfo name={userData?.fullName} />
          <div className="p-2 md:flex flex-col justify-center items-center flex-wrap">
            <div className="p-4 bg-primary-darker rounded-md text-center break-words text-xs md:text-base">
              {shareUrl}
            </div>
            <div className="space-y-2">
              <div className="flex gap-4 mt-6 justify-between">
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
          className="bg-white rounded-lg shadow-lg p-4"
        >
          <h3 className="text-base md:text-3xl font-bold mb-6 text-gray-800">
            الرسائل المستلمة
          </h3>
          <SparkButton
            onClick={fetchMessages}
            className="bg-gray-500 hover:bg-gray-darker text-white px-6 py-2 rounded-lg transition-colors duration-200 mb-6 text-sm md:text-base"
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
                  className="text-center text-gray-600 text-xs md:text-lg"
                >
                  لا توجد رسائل حتى الآن
                </motion.p>
              )}
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

// eslint-disable-next-line react/prop-types
function UserInfo({ name }) {
  return (
    <div className="py-4 flex flex-col justify-center items-center">
      <User
        size={60}
        className="text-3xl rounded-full bg-gray-200 text-gray-700 border-gray-500 border-2  md:mb-8"
      />
      <h2 className="text-base md:text-4xl mb-4 text-gray-800 font-headers">
        {name}
      </h2>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function CopyURL({ loading, shareProfile }) {
  return (
    <SparkButton
      onClick={shareProfile}
      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base"
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
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 text-sm md:text-base"
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
          className="bg-gray-200 p-3 md:p-4 rounded-lg shadow-md border border-gray-600 flex flex-col gap-3 w-full break-words overflow-hidden text-sm md:text-base"
        >
          <p className="text-text-primary text-md md:text-base break-words overflow-hidden">
            {message.content}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xs md:text-sm text-text-gray break-words">
              {new Date(message.createdAt).toLocaleString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {/* <button
              className="px-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => onDelete(message._id)}
              disabled={deletingId === message._id}
            >
              {deletingId === message._id ? "..." : "🗑"}
            </button> */}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
