import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = "MySuperSecretKey";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

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

        // console.log("🔑 Token being sent:", decryptedToken);

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

  // ✅ جلب الرسائل عند تغيير التوكن فقط
  useEffect(() => {
    if (userData?.token) {
      fetchMessages();
    }
  }, [userData?.token]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://64.23.184.122:2001/api/messages/",
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
            Accept: "application/json",
          },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/Login");
  };

  const shareProfile = () => {
    const shareUrl = `${window.location.origin}/send-message/${userId}`;
    navigator.clipboard.writeText(shareUrl);
    alert("تم نسخ رابط ملفك الشخصي!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">الملف الشخصي</h2>
        <div className="space-y-2">
          <p className="text-lg">الاسم: {userData?.fullName}</p>
          <div className="flex gap-4 mt-4">
            <button
              onClick={shareProfile}
              className="bg-secondary-lighter hover:bg-secondary-darker text-white px-4 py-2 rounded-md"
            >
              مشاركة الملف الشخصي
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">الرسائل المستلمة</h3>

        <button
          onClick={fetchMessages}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
        >
          🔄 تحديث الرسائل
        </button>

        {loading ? (
          <p className="text-center text-gray-500">جارٍ تحميل البيانات...</p>
        ) : messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message._id}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <p className="text-gray-600">{message.content}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(message.createdAt).toLocaleString("ar-EG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">لا توجد رسائل حتى الآن</p>
        )}
      </div>
    </div>
  );
}
