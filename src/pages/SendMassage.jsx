import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import {
  SECRET_KEY,
  POST_MESSAGES_TOUSER,
  USERS,
} from "./components/SecretKey";

export default function SendMessage() {
  const { userId } = useParams();
  const [recipientName, setRecipientName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessages] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const decryptedName = CryptoJS.AES.decrypt(
          parsedData.fullName,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        setRecipientName(decryptedName || "مستخدم غير معروف");
      } catch (error) {
        console.error("خطأ في فك التشفير:", error);
        setRecipientName("مستخدم غير معروف");
      }
    } else {
      setRecipientName("مستخدم غير معروف");
    }
  }, []);

  // async function currentUser() {
  //   try {
  //     const res = await axios.get(
  //       `http://64.23.184.122:2001/api/user/${userId}`
  //     );
  //     const data = res.data;
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
  // currentUser();

  async function sendMessage() {
    if (!message.trim()) {
      setStatus({ text: "⚠️ الرسالة لا يمكن أن تكون فارغة!", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${POST_MESSAGES_TOUSER}${userId}`,
        { content: message },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("🔵 Response from API:", res.data);

      setMessages((prevMessages) => [...prevMessages, { content: message }]);
      setStatus({ text: "✅ تم إرسال الرسالة بنجاح!", type: "success" });
      setMessages([]);
      setInterval(() => {
        setStatus("");
      }, 2000);
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error);
      setStatus({
        text: error.response?.data?.message || "❌ حدث خطأ أثناء الإرسال.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-secondary-darker/90 to-secondary-darker/75 text-text-primary">
      <div className="bg-primary-main p-6 rounded-lg shadow-lg w-full max-w-md">
        {recipientName ? (
          <div className="mb-4 p-4 text-center rounded">
            <h3 className="text-sm font-semibold">👤 إرسال رسالة إلى:</h3>
            <p className="text-3xl font-headers text-secondary-lighter font-bold">
              {recipientName}
            </p>
          </div>
        ) : (
          <p className="text-center text-red-400">مستقبل الرسالة غير معروف</p>
        )}

        <textarea
          className="w-full p-2 rounded bg-primary-darker text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary-lighter"
          rows="4"
          placeholder="✍️ اكتب رسالتك هنا..."
          value={message}
          onChange={(e) => setMessages(e.target.value)}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`mt-4 ${
            loading
              ? "bg-secondary-main cursor-not-allowed"
              : "bg-secondary-lighter hover:bg-secondary-darker"
          } text-primary-main px-4 py-2 rounded w-full transition-all`}
        >
          {loading ? "⏳ جاري الإرسال..." : "🚀 إرسال"}
        </button>
        {status && (
          <p
            className={`mt-4 text-center ${
              status.type === "error" ? "text-red-400" : "text-green-400"
            }`}
          >
            {status.text}
          </p>
        )}
      </div>
    </div>
  );
}
