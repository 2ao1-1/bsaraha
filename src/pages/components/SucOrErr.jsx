import { motion } from "framer-motion";

export function ErrorMessage({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-red-500 text-center p-2 bg-red-100 rounded-md"
    >
      {children}
    </motion.p>
  );
}
export function SuccessMessage({ children }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-green-500 text-center p-2 bg-green-100 rounded-md"
    >
      {children}
    </motion.p>
  );
}
