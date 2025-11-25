import {
  Edit2,
  Eye,
  EyeOff,
  Loader2,
  MessageCircle,
  Trash2,
  X,
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
  cancelReply,
  isDeleting,
  isTogglingVisibility,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-xl p-4 border hover:border-gray-300 transition-all"
    >
      <div className="mb-3">
        <p className="text-gray-800 leading-relaxed mb-2">{message.content}</p>
        <p className="text-xs text-gray-500">
          {new Date(message.createdAt).toLocaleString("ar-EG")}
        </p>
      </div>

      {message.reply?.content && (
        <div className="bg-blue-50 rounded-lg p-3 mb-3 border-r-4 border-blue-500">
          <p className="text-sm text-gray-700 mb-1">{message.reply.content}</p>
          <p className="text-xs text-gray-500">
            {new Date(message.reply.createdAt).toLocaleString("ar-EG")}
          </p>
        </div>
      )}

      {(isReplying || isEditingReply) && (
        <div className="flex gap-2 mb-3">
          <input
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="اكتب ردك..."
            className="flex-1 px-3 py-2 border rounded-lg outline-none focus:border-blue-500"
            autoFocus
          />
          <button
            onClick={isEditingReply ? handleUpdateReply : handleReply}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isEditingReply ? "حفظ" : "إرسال"}
          </button>
          <button
            onClick={cancelReply}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex justify-between items-center pt-3 border-t">
        <div className="flex gap-2">
          <button
            onClick={() => onToggleVisibility(message._id, message.isPublic)}
            disabled={isTogglingVisibility}
            className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
            style={{
              backgroundColor: message.isPublic ? "#dcfce7" : "#dbeafe",
              color: message.isPublic ? "#16a34a" : "#2563eb",
            }}
          >
            {isTogglingVisibility ? (
              <Loader2 size={14} className="animate-spin" />
            ) : message.isPublic ? (
              <Eye size={14} />
            ) : (
              <EyeOff size={14} />
            )}
            {message.isPublic ? "عام" : "خاص"}
          </button>

          {!message.reply?.content && !isReplying && !isEditingReply && (
            <button
              onClick={onReply}
              className="flex items-center gap-1 text-blue-600 text-sm hover:text-blue-700"
            >
              <MessageCircle size={14} /> رد
            </button>
          )}

          {message.reply?.content && !isReplying && !isEditingReply && (
            <>
              <button
                onClick={onEditReply}
                className="flex items-center gap-1 text-green-600 text-sm hover:text-green-700"
              >
                <Edit2 size={14} /> تعديل الرد
              </button>
              <button
                onClick={onDeleteReply}
                className="flex items-center gap-1 text-orange-600 text-sm hover:text-orange-700"
              >
                <Trash2 size={14} /> حذف الرد
              </button>
            </>
          )}
        </div>

        <button
          onClick={onDeleteMessage}
          disabled={isDeleting}
          className="flex items-center gap-1 text-red-600 text-sm hover:text-red-700 disabled:opacity-50"
        >
          <Trash2 size={14} />
          {isDeleting ? "جاري..." : "حذف"}
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
