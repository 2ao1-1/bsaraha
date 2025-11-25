import { Search } from "lucide-react";
import PropTypes from "prop-types";

EmptyState.propTypes = {
  message: PropTypes.string,
};

export default function EmptyState({ message }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Search size={48} className="text-gray-400" />
      </div>
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
}
