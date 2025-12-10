import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function Toast({ message, type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-2xl ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white max-w-sm`}
    >
      <p className="font-medium">{message}</p>
    </motion.div>
  );
}
Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(["success", "error"]),
};
