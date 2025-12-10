import { Loader2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

MessageCard.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    recipient: PropTypes.shape({
      username: PropTypes.string,
    }),
    isRead: PropTypes.bool,
    content: PropTypes.string,
    reply: PropTypes.shape({
      content: PropTypes.string,
    }),
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  actionLoading: PropTypes.string,
};

export default function MessageCard({ message, onDelete, actionLoading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-500">إلى:</span>
            <span className="font-medium text-gray-800">
              @{message.recipient?.username || "مجهول"}
            </span>
            {message.isRead && (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                مقروءة
              </span>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed mb-3">
            {message.content}
          </p>

          {message.reply?.content && (
            <div className="bg-blue-50 rounded-lg p-3 border-r-4 border-blue-500">
              <p className="text-sm text-blue-800">
                <strong>الرد:</strong> {message.reply.content}
              </p>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-3">
            {new Date(message.createdAt).toLocaleString("ar-EG")}
          </p>
        </div>

        <button
          onClick={() => onDelete(message._id)}
          disabled={actionLoading === message._id}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
          title="حذف الرسالة"
        >
          {actionLoading === message._id ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>
    </motion.div>
  );
}
