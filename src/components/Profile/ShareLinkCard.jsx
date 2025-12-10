import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import PropTypes from "prop-types";

export default function ShareLinkCard({ shareLink, copiedLink, onCopy }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:w-1/2"
    >
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 mb-2">
          شارك هذا الرابط لاستقبال رسائل مجهولة:
        </p>
        <div className="bg-white border rounded-lg p-3 text-sm break-all font-mono text-gray-700">
          {shareLink}
        </div>
      </div>

      <button
        onClick={onCopy}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-400 hover:bg-brand-600 text-white rounded-lg font-semibold transition-all"
      >
        {copiedLink ? <Check size={18} /> : <Copy size={18} />}
        {copiedLink ? "تم النسخ!" : "نسخ الرابط"}
      </button>
    </motion.div>
  );
}

ShareLinkCard.propTypes = {
  shareLink: PropTypes.string.isRequired,
  copiedLink: PropTypes.bool,
  onCopy: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
};
