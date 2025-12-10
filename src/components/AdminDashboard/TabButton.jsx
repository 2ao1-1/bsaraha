import PropTypes from "prop-types";

export default function TabButton({ active, onClick, icon, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-4 font-medium transition-all relative ${
        active
          ? "text-purple-600 border-b-2 border-purple-600"
          : "text-gray-600 hover:text-gray-800"
      }`}
    >
      {icon}
      {label}
      {badge !== undefined && (
        <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

TabButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  badge: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
