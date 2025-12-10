import {
  Edit2,
  Eye,
  EyeOff,
  Loader2,
  LucideSendHorizonal,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function MessageCard({
  message,
  onToggleVisibility,
  onReply,
  onEditReply,
  onDeleteMessage,
  onDeleteReply,
  isReplying,
  isEditingReply,
  replyContent,
  setReplyContent,
  handleReply,
  handleUpdateReply,
  isDeleting,
  isTogglingVisibility,
}) {
  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = (now - past) / 1000;

    if (diff < 60) return "ثوانٍ";
    if (diff < 3600) return `${Math.floor(diff / 60)} s`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} h`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} d`;

    return past.toLocaleDateString("ar-EG");
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-xl p-4 border hover:border-gray-300 transition-all"
    >
      <div className="mb-3 flex justify-between">
        <p className="text-gray-800  mb-2 w-5/6 md:w-11/12 break-words whitespace-pre-wrap">
          {message.content}
        </p>
        <p className="text-xs text-end text-slate-500 p-2">
          {timeAgo(message.createdAt)}
        </p>
      </div>

      {message.reply?.content && (
        <div className="bg-brand-50 rounded-lg p-3 mb-3 flex justify-between">
          <p className="text-sm text-gray-700 mb-1 w-5/6 md:w-11/12">
            {message.reply.content}
          </p>
          <p className="text-xs text-gray-500">
            {timeAgo(message.reply.createdAt)}
          </p>
        </div>
      )}

      {(isReplying || isEditingReply) && (
        <div className="flex flex-col gap-2 mb-3">
          <input
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="اكتب ردك..."
            className="flex-1 px-3 py-2 border rounded-lg outline-none focus:border-brand-500"
            autoFocus
          />
          <div className="flex gap-4">
            <button
              onClick={isEditingReply ? handleUpdateReply : handleReply}
              className="px-4 py-2 "
            >
              <LucideSendHorizonal size={18} />
            </button>
            <button
              onClick={onDeleteReply}
              className="flex items-center gap-1 text-orange-600 text-sm hover:text-orange-700"
            >
              <Trash2 size={16} />
            </button>
            {/* <button onClick={cancelReply} className="px-4 py-2 ">
              <X size={16} />
            </button> */}
          </div>
        </div>
      )}

      <div className="flex justify-end gap-4">
        <button
          onClick={() => onToggleVisibility(message._id, message.isPublic)}
          disabled={isTogglingVisibility}
          className="flex items-center gap-1 text-sm py-1.5 rounded-lg transition-colors disabled:opacity-50"
          style={{
            color: message.isPublic ? "#16a34a" : "#8055DD",
          }}
        >
          {isTogglingVisibility ? (
            <Loader2 size={16} className="animate-spin" />
          ) : message.isPublic ? (
            <Eye size={16} />
          ) : (
            <EyeOff size={16} />
          )}
        </button>
        {!message.reply?.content && !isReplying && !isEditingReply && (
          <button
            onClick={onReply}
            className="flex items-center gap-1 text-brand-600 text-sm hover:text-brand-700"
          >
            <MessageCircle size={16} />
          </button>
        )}
        {message.reply?.content && !isReplying && !isEditingReply && (
          <>
            <button
              onClick={onEditReply}
              className="flex items-center gap-1 text-green-600 text-sm hover:text-green-700"
            >
              <Edit2 size={16} />
            </button>
          </>
        )}
        <button
          onClick={onDeleteMessage}
          disabled={isDeleting}
          className="flex items-center gap-1 text-red-600 text-sm hover:text-red-700 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.object.isRequired,
  onToggleVisibility: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
  onEditReply: PropTypes.func,
  onDeleteMessage: PropTypes.func.isRequired,
  onDeleteReply: PropTypes.func,
  isReplying: PropTypes.bool,
  isEditingReply: PropTypes.bool,
  replyContent: PropTypes.string,
  setReplyContent: PropTypes.func.isRequired,
  handleReply: PropTypes.func.isRequired,
  handleUpdateReply: PropTypes.func,
  cancelReply: PropTypes.func.isRequired,
  isDeleting: PropTypes.bool,
  isTogglingVisibility: PropTypes.bool,
};
