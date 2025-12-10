import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
AuthCard.propTypes = {
  children: PropTypes.node,
  showClose: PropTypes.bool,
};

export default function AuthCard({ children, showClose = true }) {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-1/2 z-50 relative md:p-8">
      {showClose && (
        <button
          type="button"
          onClick={() => navigate("/")}
          className="absolute top-0 md:top-4 left-0 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={24} />
        </button>
      )}

      {children}
    </div>
  );
}
