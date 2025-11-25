import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function AdminAuthCard({ children }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6 relative">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X size={24} />
      </button>
      {children}
    </div>
  );
}

AdminAuthCard.propTypes = {
  children: PropTypes.node,
};
