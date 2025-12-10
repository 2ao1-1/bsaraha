import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Loader2, RefreshCw } from "lucide-react";
import MessageCard from "../../components/Profile/MessageCard";

export default function MessagesSection({
  messages,
  loading,
  onRefresh,
  onToggleVisibility,
  onReply,
  onEditReply,
  onDeleteMessage,
  onDeleteReply,
  replyingTo,
  editingReply,
  replyContent,
  setReplyContent,
  handleReply,
  handleUpdateReply,
  cancelReply,
  deletingId,
  togglingVisibility,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          الرسائل
          {messages.length > 0 && (
            <span className="bg-brand-400 text-white text-sm px-3 py-1 rounded-full">
              {messages.length}
            </span>
          )}
        </h3>

        <button
          onClick={onRefresh}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
        </div>
      ) : messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((msg) => (
            <MessageCard
              key={msg._id}
              message={msg}
              onToggleVisibility={() => onToggleVisibility(msg._id)}
              onReply={() => onReply(msg._id)}
              onEditReply={() => onEditReply(msg._id)}
              onDeleteMessage={() => onDeleteMessage(msg._id)}
              onDeleteReply={() => onDeleteReply(msg._id)}
              isReplying={replyingTo === msg._id}
              isEditingReply={editingReply === msg._id}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleReply={() => handleReply(msg._id)}
              handleUpdateReply={() => handleUpdateReply(msg._id)}
              cancelReply={cancelReply}
              isDeleting={deletingId === msg._id}
              isTogglingVisibility={togglingVisibility === msg._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-16 h-16 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            لا توجد رسائل
          </h3>
          <p className="text-gray-500">شارك رابطك لاستقبال رسائل بصراحة!</p>
        </div>
      )}
    </motion.div>
  );
}

MessagesSection.propTypes = {
  messages: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onRefresh: PropTypes.func.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  onEditReply: PropTypes.func.isRequired,
  onDeleteMessage: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func.isRequired,
  replyingTo: PropTypes.string,
  editingReply: PropTypes.string,
  replyContent: PropTypes.string,
  setReplyContent: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  handleUpdateReply: PropTypes.func.isRequired,
  cancelReply: PropTypes.func.isRequired,
  deletingId: PropTypes.string,
  togglingVisibility: PropTypes.string,
};
