import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const SECRET_KEY = "MySuperSecretKey";

export default function SendMessage() {
  const { userId } = useParams();
  const [recipientName, setRecipientName] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessages] = useState([]);

  // function resetProfie() {
  //   setMessages([]);
  //   setLoading(true);
  //   fetchMessages(userData?.token);
  // }

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const decryptedName = CryptoJS.AES.decrypt(
          parsedData.fullName,
          SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        console.log(decryptedName);

        setRecipientName(decryptedName || "مستخدم غير معروف");
      } catch (error) {
        console.error("خطأ في فك التشفير:", error);
        setRecipientName("مستخدم غير معروف");
      }
    } else {
      setRecipientName("مستخدم غير معروف");
    }
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) {
      setStatus({ text: "⚠️ الرسالة لا يمكن أن تكون فارغة!", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `http://64.23.184.122:2001/api/messages/${userId}`,
        { content: message },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("🔵 Response from API:", res.data); // ✅ تحقق مما يرجعه السيرفر

      setMessages((prevMessages) => [...prevMessages, { content: message }]);
      setStatus({ text: "✅ تم إرسال الرسالة بنجاح!", type: "success" });
      setMessages([]);
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error);
      setStatus({
        text: error.response?.data?.message || "❌ حدث خطأ أثناء الإرسال.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        {recipientName ? (
          <div className="mb-4 p-4 bg-gray-700 rounded">
            <h3 className="text-lg font-semibold">👤 إرسال رسالة إلى:</h3>
            <p className="text-xl text-blue-300 font-bold">{recipientName}</p>
          </div>
        ) : (
          <p className="text-center text-red-400">مستقبل الرسالة غير معروف</p>
        )}

        <textarea
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded w-full transition-all`}
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
