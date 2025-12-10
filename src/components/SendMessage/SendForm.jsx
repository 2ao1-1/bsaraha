import PropTypes from "prop-types";
import { Loader2, Send } from "lucide-react";

export default function SendForm({
  message,
  setMessage,
  handleSend,
  loading,
  charCount,
  maxChars,
}) {
  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="اكتب رسالتك هنا... (سيتم إرسالها بشكل مجهول)"
          rows={6}
          maxLength={maxChars}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none resize-none"
        />

        <div className="flex justify-end items-center mt-2 text-sm">
          <span
            className={
              charCount > maxChars * 0.9 ? "text-red-500" : "text-gray-500"
            }
          >
            {charCount} / {maxChars}
          </span>
        </div>
      </div>

      <button
        onClick={handleSend}
        disabled={loading || charCount < 1 || charCount > maxChars}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            جاري الإرسال...
          </>
        ) : (
          <>
            <Send size={20} />
            إرسال الرسالة
          </>
        )}
      </button>
    </div>
  );
}

SendForm.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  charCount: PropTypes.number,
  maxChars: PropTypes.number,
};

SendForm.defaultProps = {
  message: "",
  loading: false,
  charCount: 0,
  maxChars: 1000,
};
