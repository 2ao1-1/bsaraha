import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { messagesAPI } from "../services/MessagesAPIs";
import { usersAPI } from "../services/UsersAPIs";

export default function useSendMessage() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const maxChars = 1000;

  const showStatus = useCallback((text, type) => {
    setStatus({ text, type });
    setTimeout(() => setStatus(null), 3000);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function loadUser() {
      setLoadingUser(true);
      const result = await usersAPI.getByUsername(username);
      if (!mounted) return;
      if (result.success) {
        const userData = result.data?.data || result.data;
        setUserInfo(userData);
      } else {
        setTimeout(() => navigate("/"), 2000);
      }
      setLoadingUser(false);
    }
    if (username) loadUser();
    return () => {
      mounted = false;
    };
  }, [username, navigate]);

  const handleSend = useCallback(async () => {
    const trimmed = message.trim();
    if (!trimmed) {
      showStatus("الرسالة لا يمكن أن تكون فارغة!", "error");
      return;
    }
    if (trimmed.length < 1) {
      showStatus("الرسالة قصيرة جداً", "error");
      return;
    }
    if (trimmed.length > maxChars) {
      showStatus("الرسالة طويلة جداً (الحد 1000 حرف)", "error");
      return;
    }

    setLoading(true);
    const result = await messagesAPI.sendMessage(username, trimmed);
    if (result.success) {
      showStatus("تم إرسال الرسالة بنجاح!", "success");
      setMessage("");
    } else {
      showStatus(result.error?.message || "فشل الإرسال", "error");
    }
    setLoading(false);
  }, [message, username, showStatus]);

  const charCount = message.length;

  return {
    userInfo,
    loadingUser,
    message,
    setMessage,
    loading,
    status,
    showStatus,
    handleSend,
    charCount,
    maxChars,
  };
}
