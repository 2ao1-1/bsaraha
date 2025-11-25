import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../services/AdminAPIs";
import {
  clearUserData,
  getAdminToken,
  clearAdminData,
} from "../helpers/LocalStorage";

export default function useAdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersPage, setUsersPage] = useState(1);
  const [usersLimit] = useState(20);
  const [usersTotal, setUsersTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messagesPage, setMessagesPage] = useState(1);
  const [messagesLimit] = useState(20);
  const [messagesTotal, setMessagesTotal] = useState(0);

  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [actionLoading, setActionLoading] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const adminToken = getAdminToken();
    if (!adminToken) {
      navigate("/admin/login", { replace: true });
      return;
    }

    loadStats();
  }, [navigate]);

  useEffect(() => {
    if (activeTab === "users") loadUsers();
  }, [activeTab, usersPage]);

  useEffect(() => {
    if (activeTab === "messages") loadMessages();
  }, [activeTab, messagesPage]);

  const loadStats = useCallback(async () => {
    setLoadingStats(true);
    const result = await adminAPI.getStats();

    if (result.success) {
      setStats(result.data?.data || result.data);
    } else if (result.error?.status === 401) {
      clearAdminData();
      navigate("/admin/login", { replace: true });
    } else {
      showToast(result.error?.message || "فشل تحميل الإحصائيات", "error");
    }

    setLoadingStats(false);
  }, [navigate]);

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true);
    const result = await adminAPI.getUsers(usersPage, usersLimit);

    if (result.success) {
      const data = result.data?.data || result.data;
      setUsers(data.users || data);
      setUsersTotal(data.total || data.users?.length || 0);
    } else {
      showToast(result.error?.message || "فشل تحميل المستخدمين", "error");
    }

    setLoadingUsers(false);
  }, [usersPage, usersLimit]);

  const loadMessages = useCallback(async () => {
    setLoadingMessages(true);
    const result = await adminAPI.getMessages(messagesPage, messagesLimit);

    if (result.success) {
      const data = result.data?.data || result.data;
      setMessages(data.messages || data);
      setMessagesTotal(data.total || data.messages?.length || 0);
    } else {
      showToast(result.error?.message || "فشل تحميل الرسائل", "error");
    }

    setLoadingMessages(false);
  }, [messagesPage, messagesLimit]);

  function showToast(msg, type) {
    type === "success" ? setSuccess(msg) : setError(msg);
    setTimeout(
      () => (type === "success" ? setSuccess(null) : setError(null)),
      3000
    );
  }

  function handlePromoteUser(userId) {
    setConfirmAction({
      type: "promote",
      id: userId,
      title: "ترقية مستخدم",
      message: "هل أنت متأكد من رغبتك في ترقية هذا المستخدم إلى أدمن؟",
    });
    setShowConfirmModal(true);
  }

  function handleDemoteUser(userId) {
    setConfirmAction({
      type: "demote",
      id: userId,
      title: "خفض رتبة مستخدم",
      message: "هل أنت متأكد من رغبتك في إزالة صلاحيات الأدمن من هذا المستخدم؟",
    });
    setShowConfirmModal(true);
  }

  function handleDeleteUser(userId) {
    setConfirmAction({
      type: "deleteUser",
      id: userId,
      title: "حذف مستخدم",
      message:
        "هل أنت متأكد من رغبتك في حذف هذا المستخدم؟ سيتم حذف جميع رسائله أيضاً. هذا الإجراء لا يمكن التراجع عنه!",
    });
    setShowConfirmModal(true);
  }

  function handleDeleteMessage(messageId) {
    setConfirmAction({
      type: "deleteMessage",
      id: messageId,
      title: "حذف رسالة",
      message: "هل أنت متأكد من رغبتك في حذف هذه الرسالة؟",
    });
    setShowConfirmModal(true);
  }

  async function confirmActionHandler() {
    if (!confirmAction) return;

    setActionLoading(confirmAction.id);

    let result;
    switch (confirmAction.type) {
      case "promote":
        result = await adminAPI.promoteUser(confirmAction.id);
        if (result.success) {
          showToast("تم ترقية المستخدم!", "success");
          loadUsers();
        }
        break;

      case "demote":
        result = await adminAPI.demoteUser(confirmAction.id);
        if (result.success) {
          showToast("تم خفض رتبة المستخدم!", "success");
          loadUsers();
          loadStats();
        }
        break;

      case "deleteUser":
        result = await adminAPI.deleteUser(confirmAction.id);
        if (result.success) {
          showToast("تم حذف المستخدم!", "success");
          loadUsers();
          loadStats();
        }
        break;

      case "deleteMessage":
        result = await adminAPI.deleteMessage(confirmAction.id);
        if (result.success) {
          showToast("تم حذف الرسالة!", "success");
          loadMessages();
          loadStats();
        }
        break;
    }

    if (result && !result.success) {
      showToast(result.error?.message || "فشل تنفيذ العملية", "error");
    }

    setActionLoading(null);
    setShowConfirmModal(false);
    setConfirmAction(null);
  }

  function handleLogout() {
    clearAdminData();
    clearUserData();
    navigate("/admin/login", { replace: true });
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    stats,
    loadingStats,
    users,
    loadingUsers,
    usersPage,
    setUsersPage,
    usersLimit,
    usersTotal,
    searchQuery,
    setSearchQuery,
    messages,
    loadingMessages,
    messagesPage,
    setMessagesPage,
    messagesLimit,
    messagesTotal,
    activeTab,
    setActiveTab,
    error,
    success,
    actionLoading,
    showConfirmModal,
    confirmAction,
    loadStats,
    loadUsers,
    loadMessages,
    handlePromoteUser,
    handleDemoteUser,
    handleDeleteUser,
    handleDeleteMessage,
    confirmActionHandler,
    showToast,
    handleLogout,
    setShowConfirmModal,
    setConfirmAction,
    setActionLoading,
    filteredUsers,
  };
}
