import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useProfile from "../hooks/useProfile";
import UsernameModal from "../components/common/UsernameModal";
import EditProfileModal from "../components/common/EditProfileModal";
import ConfirmModal from "../components/common/ConfirmModal";
import UserProfileCard from "../components/Profile/UserProfileCard";
import ShareLinkCard from "../components/Profile/ShareLinkCard";
import MessagesSection from "../components/Profile/MessagesSection";

const CLIENT_URL = import.meta.env.VITE_CLIENT_URL || "http://localhost:5173";

export default function Profile() {
  const navigate = useNavigate();
  const profile = useProfile(navigate);

  const {
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
  } = profile;

  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
      </div>
    );
  }

  const shareLink = `${CLIENT_URL}/${userData?.username || ""}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  }

  async function shareProfile() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "بصراحه",
          text: `أرسل لي رسالة بصراحة!`,
          url: shareLink,
        });
      } catch {
        copyLink();
      }
    } else {
      copyLink();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8">
      <div className="container mx-auto px-4 max-w-4xl space-y-6">
        <UserProfileCard
          userData={userData}
          profileImage={profileImage}
          fileInputRef={fileInputRef}
          showImageMenu={showImageMenu}
          onToggleImageMenu={() => setShowImageMenu((s) => !s)}
          onChooseFile={(e) => handleImageUpload(e.target.files?.[0])}
          onDeleteImage={handleDeleteImage}
          onEditProfile={() => setShowEditProfileModal(true)}
          onUsernameEdit={() => setShowUsernameModal(true)}
          onLogout={() => handleLogout("/")}
        />

        <ShareLinkCard
          shareLink={shareLink}
          copiedLink={copiedLink}
          onCopy={copyLink}
          onShare={shareProfile}
        />

        <MessagesSection
          messages={messages}
          loading={loading}
          onRefresh={fetchMessages}
          onToggleVisibility={toggleMessageVisibility}
          onReply={(id) => setReplyingTo(id)}
          onEditReply={(id) => {
            setEditingReply(id);
            setReplyContent(
              messages.find((m) => m._id === id)?.reply?.content || ""
            );
          }}
          onDeleteMessage={(id) => {
            setDeleteTarget({ type: "message", id });
            setShowDeleteModal(true);
          }}
          onDeleteReply={(id) => {
            setDeleteTarget({ type: "reply", id });
            setShowDeleteModal(true);
          }}
          replyingTo={replyingTo}
          editingReply={editingReply}
          replyContent={replyContent}
          setReplyContent={setReplyContent}
          handleReply={(id) => handleReply(id, replyContent)}
          handleUpdateReply={(id) => handleUpdateReply(id, replyContent)}
          cancelReply={() => {
            setReplyingTo(null);
            setEditingReply(null);
            setReplyContent("");
          }}
          deletingId={deletingId}
          togglingVisibility={togglingVisibility}
        />
      </div>

      <UsernameModal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        currentUsername={userData.username}
        onSuccess={handleUsernameUpdate}
      />

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        currentData={userData}
        onSuccess={handleProfileUpdate}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        title={deleteTarget?.type === "message" ? "حذف الرسالة" : "حذف الرد"}
        message={
          deleteTarget?.type === "message"
            ? "هل أنت متأكد من رغبتك في حذف هذه الرسالة؟ لا يمكن التراجع عن هذا الإجراء."
            : "هل أنت متأكد من رغبتك في حذف هذا الرد؟"
        }
        onConfirm={async () => {
          await confirmDelete(deleteTarget);
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        confirmText="حذف"
        cancelText="إلغاء"
        isLoading={!!deletingId}
        isDangerous={true}
      />
    </div>
  );
}
