import { motion } from "framer-motion";
import { MessageCircle, Copy, Share2, Check } from "lucide-react";
import PropTypes from "prop-types";

export default function ShareLinkCard({
  shareLink,
  copiedLink,
  onCopy,
  onShare,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MessageCircle size={24} className="text-blue-600" /> رابط استقبال
        الرسائل
      </h3>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 mb-2">
          شارك هذا الرابط لاستقبال رسائل مجهولة:
        </p>
        <div className="bg-white border rounded-lg p-3 text-sm break-all font-mono text-gray-700">
          {shareLink}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCopy}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
        >
          {copiedLink ? <Check size={18} /> : <Copy size={18} />}
          {copiedLink ? "تم النسخ!" : "نسخ الرابط"}
        </button>
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all"
        >
          <Share2 size={18} /> مشاركة
        </button>
      </div>
    </motion.div>
  );
}

ShareLinkCard.propTypes = {
  shareLink: PropTypes.string.isRequired,
  copiedLink: PropTypes.bool,
  onCopy: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};
