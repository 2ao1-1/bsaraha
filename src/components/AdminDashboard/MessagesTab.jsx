import { Loader2, RefreshCw } from "lucide-react";
import Pagination from "./DashBoardPafination";
import MessageCard from "./DashMessageCard";
import EmptyState from "./EmptyDashboard";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function MessagesTab({
  messages,
  loading,
  onDelete,
  actionLoading,
  page,
  setPage,
  total,
  limit,
  onRefresh,
}) {
  const totalPages = Math.ceil(total / limit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          إدارة الرسائل ({total})
        </h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
        >
          <RefreshCw size={18} />
          تحديث
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
        </div>
      ) : messages?.length > 0 ? (
        <>
          <div className="space-y-4">
            {messages?.map((message) => (
              <MessageCard
                key={message._id}
                message={message}
                onDelete={onDelete}
                actionLoading={actionLoading}
              />
            ))}
          </div>

          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <EmptyState message="لا توجد رسائل" />
      )}
    </motion.div>
  );
}

MessagesTab.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  actionLoading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  total: PropTypes.number,
  limit: PropTypes.number,
  onRefresh: PropTypes.func,
};
