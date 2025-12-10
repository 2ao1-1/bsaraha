import PropTypes from "prop-types";

export default function ActivityItem({ icon, text, time }) {
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-gray-800">{text}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
  );
}

ActivityItem.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  time: PropTypes.string,
};
