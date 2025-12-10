import { motion } from "framer-motion";
import { User } from "lucide-react";
import PropTypes from "prop-types";

export default function PublicMessageCard({
  message,
  ownerName = "المستخدم",
  profilePic,
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-50 rounded-xl p-4 border-2 border-brand-100"
    >
      <div className="flex items-start gap-3 w-full">
        <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center flex-shrink-0">
          <User size={20} className="text-white" />
        </div>

        <div className="flex-grow flex md:flex-row justify-between">
          <p className="font-semibold text-gray-800 mb-2 w-5/6 md:w-11/12 whitespace-pre-wrap break-all">
            {message.content}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {timeAgo(message.createdAt)}
          </p>
        </div>
      </div>

      {message.reply?.content && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-4"
        >
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center flex-shrink-0">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt={ownerName}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User size={48} className="text-white" />
              )}
            </span>
            <div className="flex-grow flex md:flex-row justify-between">
              {/* <div className="w-full flex justify-between items-center">
                {/* <p className="text-sm font-medium text-blue-600 ">
                  {ownerName}
                </p> 
              </div> */}
              <p className="text-gray-600 py-2 w-5/6 md:w-11/12">
                {message.reply.content}
              </p>
              <p className="text-xs text-gray-500 ">
                {timeAgo(message.reply.createdAt)}
              </p>
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
  profilePic: PropTypes.string,
};
