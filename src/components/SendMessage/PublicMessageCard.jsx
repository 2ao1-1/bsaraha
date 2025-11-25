import { motion } from "framer-motion";
import { User, Reply } from "lucide-react";
import PropTypes from "prop-types";

export default function PublicMessageCard({ message, ownerName = "المستخدم" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-200"
    >
      <div className="mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-white" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-purple-600 mb-1">
                رسالة مجهولة
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {new Date(message.createdAt).toLocaleDateString("ar-EG")}
              </p>
            </div>

            <p className="text-gray-800 leading-relaxed">{message.content}</p>
          </div>
        </div>
      </div>

      {message.reply?.content && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border-t border-gray-200 rounded-b-lg p-4"
        >
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center flex-shrink-0">
              <Reply size={12} className="text-secondary-lighter" />
            </span>
            <div className="w-full">
              <div className="w-full flex justify-between items-center">
                <p className="text-sm font-medium text-blue-600 ">
                  {ownerName}
                </p>
                <p className="text-xs text-gray-500 ">
                  {new Date(message.reply.createdAt).toLocaleDateString(
                    "ar-EG"
                  )}
                </p>
              </div>
              <p className="text-gray-600 py-2">{message.reply.content}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

PublicMessageCard.propTypes = {
  message: PropTypes.shape({
    _id: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string,
    reply: PropTypes.shape({
      content: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  }).isRequired,
  ownerName: PropTypes.string,
};
