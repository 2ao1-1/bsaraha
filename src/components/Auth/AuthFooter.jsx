import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
AuthFooter.propTypes = {
  question: PropTypes.string.isRequired,
  actionText: PropTypes.string.isRequired,
  actionTo: PropTypes.string.isRequired,
};

export default function AuthFooter({ question, actionText, actionTo }) {
  const navigate = useNavigate();
  return (
    <div className="text-center pt-4 border-t">
      <p className="text-gray-600">
        {question}
        <button
          type="button"
          onClick={() => navigate(actionTo)}
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
        >
          {actionText}
        </button>
      </p>
    </div>
  );
}
