import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { usersAPI } from "../services/UsersAPIs";
import { messagesAPI } from "../services/MessagesAPIs";
import { isTokenValid } from "../helpers/TokenValidation";
import { clearUserData, getUserData } from "../helpers/LocalStorage";

export default function useProfile(navigate) {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [copiedLink, setCopiedLink] = useState(false);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const fileInputRef = useRef(null);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [editingReply, setEditingReply] = useState(null);

  const [deletingId, setDeletingId] = useState(null);
  const [togglingVisibility, setTogglingVisibility] = useState(null);

  useEffect(() => {
    async function init() {
      if (!isTokenValid()) {
        clearUserData();
        navigate("/login", { replace: true });
        return;
      }

      const stored = getUserData();
      if (!stored) {
        navigate("/login", { replace: true });
        return;
      }

      setUserData(stored);

      try {
        const result = await usersAPI.getProfile();

        if (result.success) {
          const profile = result.data?.data || result.data;

          setUserData((prev) => ({
            ...prev,
            fullName:
              profile.fullName || `${profile.firstName} ${profile.lastName}`,
            username: profile.username,
            bio: profile.bio || "",
            usernameEdited: profile.usernameEdited,
            profilePicture: profile.profilePicture,
          }));

          if (profile.profilePicture) {
            setProfileImage(profile.profilePicture);
          }
        } else {
          toast.error("فشل تحميل البيانات");
        }
      } catch (err) {
        toast.error("حدث خطأ أثناء تحميل البروفايل", err);
      }

      await fetchMessages();
    }

    init();
  }, []);

  async function fetchMessages() {
    setLoading(true);

    try {
      const result = await messagesAPI.getMyMessages();
      if (result.success) {
        const messagesData = result.data?.data || result.data || [];
        setMessages(messagesData);
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء تحميل الرسائل"), err;
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(file) {
    if (!file) return;

    try {
      const result = await usersAPI.uploadProfilePicture(file);

      if (result.success) {
        const imageUrl =
          result.data?.profilePicture || result.data?.data?.profilePicture;
        setProfileImage(imageUrl);
        toast.success("تم رفع الصورة بنجاح!");
      } else {
        toast.error(result.error?.message || "فشل رفع الصورة");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء رفع الصورة"), err;
    } finally {
      setShowImageMenu(false);
    }
  }

  async function handleDeleteImage() {
    try {
      const result = await usersAPI.deleteProfilePicture();

      if (result.success) {
        setProfileImage(null);
        toast.success("تم حذف الصورة!");
      } else {
        toast.error(result.error?.message || "فشل حذف الصورة");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء حذف الصورة"), err;
    } finally {
      setShowImageMenu(false);
    }
  }

  async function toggleMessageVisibility(id) {
    setTogglingVisibility(id);

    try {
      const result = await messagesAPI.showInPublic(id);

      if (result.success) {
        const updatedMsg = result.data?.data || result.data;
        setMessages((prev) => prev.map((m) => (m._id === id ? updatedMsg : m)));
        toast.success(
          updatedMsg.isPublic ? "تم عرض الرسالة للعامة!" : "تم إخفاء الرسالة"
        );
      } else {
        toast.error(result.error?.message || "فشل تحديث الرسالة");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء تحديث الرسالة"), err;
    } finally {
      setTogglingVisibility(null);
    }
  }

  async function handleReply(id, content) {
    if (content.trim().length < 1) {
      toast.error("الرد لا يمكن أن يكون فارغاً");
      return;
    }

    try {
      const result = await messagesAPI.replyToMessage(id, content.trim());

      if (result.success) {
        const updatedMsg = result.data?.data || result.data;
        setMessages((prev) => prev.map((m) => (m._id === id ? updatedMsg : m)));
        toast.success("تم الرد!");
        setReplyContent("");
        setReplyingTo(null);
      } else {
        toast.error(result.error?.message || "فشل الرد");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الرد", err);
    }
  }

  async function handleUpdateReply(id, content) {
    if (content.trim().length < 1) {
      toast.error("الرد لا يمكن أن يكون فارغاً");
      return;
    }

    try {
      const result = await messagesAPI.updateReply(id, content.trim());

      if (result.success) {
        const updatedMsg = result.data?.data || result.data;
        setMessages((prev) => prev.map((m) => (m._id === id ? updatedMsg : m)));
        toast.success("تم تعديل الرد!");
        setReplyContent("");
        setEditingReply(null);
      } else {
        toast.error(result.error?.message || "فشل التعديل");
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء التعديل", err);
    }
  }

  async function confirmDelete(target) {
    if (!target) return;

    setDeletingId(target.id);

    try {
      if (target.type === "message") {
        const result = await messagesAPI.deleteMessage(target.id);

        if (result.success || result.error?.status === 404) {
          setMessages((prev) => prev.filter((m) => m._id !== target.id));
          toast.success("تم حذف الرسالة!");
        } else {
          toast.error(result.error?.message || "فشل الحذف");
        }
      } else {
        const result = await messagesAPI.deleteReply(target.id);

        if (result.success) {
          const updatedMsg = result.data?.data || result.data;
          setMessages((prev) =>
            prev.map((m) => (m._id === target.id ? updatedMsg : m))
          );
          toast.success("تم حذف الرد!");
        } else {
          toast.error(result.error?.message || "فشل حذف الرد");
        }
      }
    } catch (err) {
      toast.error("حدث خطأ أثناء الحذف"), err;
    } finally {
      setDeletingId(null);
    }
  }

  function handleLogout(navigateTo = "/") {
    clearUserData();
    toast.success("تم تسجيل الخروج");
    navigate(navigateTo, { replace: true });
  }

  function handleUsernameUpdate(newUsername) {
    setUserData((prev) => ({
      ...prev,
      username: newUsername,
      usernameEdited: true,
    }));

    const stored = getUserData();
    if (stored) {
      stored.username = newUsername;
      localStorage.setItem("UserData", JSON.stringify(stored));
    }
  }

  function handleProfileUpdate(updatedData) {
    setUserData((prev) => ({ ...prev, ...updatedData }));
  }

  return {
    userData,
    profileImage,
    messages,
    loading,
    copiedLink,
    showImageMenu,
    fileInputRef,
    replyingTo,
    replyContent,
    editingReply,
    deletingId,
    togglingVisibility,
    setCopiedLink,
    setShowImageMenu,
    setReplyContent,
    setReplyingTo,
    setEditingReply,
    setTogglingVisibility,
    fetchMessages,
    handleImageUpload,
    handleDeleteImage,
    toggleMessageVisibility,
    handleReply,
    handleUpdateReply,
    confirmDelete,
    handleLogout,
    handleUsernameUpdate,
    handleProfileUpdate,
  };
}
