import { AnimatePresence } from "framer-motion";

import ConfirmModal from "../components/common/ConfirmModal";
import useAdminDashboard from "../hooks/useAdminDashboard";
import Toast from "../components/AdminDashboard/BashboardToast";
import MessagesTab from "../components/AdminDashboard/MessagesTab";
import UsersTab from "../components/AdminDashboard/UsersTab";
import OverviewTab from "../components/AdminDashboard/OverviewTab";
import DashboardHeader from "../components/AdminDashboard/DashboardHeader";
import DashboardTabs from "../components/AdminDashboard/DashboardTabs";

export default function AdminDashboard() {
  const {
    stats,
    loadingStats,
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
    handleLogout,
    setShowConfirmModal,
    setConfirmAction,
    filteredUsers,
  } = useAdminDashboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <DashboardHeader handleLogout={handleLogout} />

      <DashboardTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        usersTotal={usersTotal}
        messagesTotal={messagesTotal}
      />

      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <OverviewTab
              stats={stats}
              loading={loadingStats}
              onRefresh={loadStats}
            />
          )}

          {activeTab === "users" && (
            <UsersTab
              users={filteredUsers}
              loading={loadingUsers}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onPromote={handlePromoteUser}
              onDemote={handleDemoteUser}
              onDelete={handleDeleteUser}
              actionLoading={actionLoading}
              page={usersPage}
              setPage={setUsersPage}
              total={usersTotal}
              limit={usersLimit}
              onRefresh={loadUsers}
            />
          )}

          {activeTab === "messages" && (
            <MessagesTab
              messages={messages}
              loading={loadingMessages}
              onDelete={handleDeleteMessage}
              actionLoading={actionLoading}
              page={messagesPage}
              setPage={setMessagesPage}
              total={messagesTotal}
              limit={messagesLimit}
              onRefresh={loadMessages}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && <Toast message={error} type="error" />}
        {success && <Toast message={success} type="success" />}
      </AnimatePresence>

      <ConfirmModal
        isOpen={showConfirmModal}
        title={confirmAction?.title || "تأكيد"}
        message={confirmAction?.message || ""}
        onConfirm={confirmActionHandler}
        onCancel={() => {
          setShowConfirmModal(false);
          setConfirmAction(null);
        }}
        confirmText="تأكيد"
        cancelText="إلغاء"
        isLoading={!!actionLoading}
        isDangerous={confirmAction?.type?.includes("delete")}
      />
    </div>
  );
}
