import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function FormHeader({ text }) {
  return (
    <motion.div
      className="text-center pb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="font-headers text-primary-main text-5xl md:text-7xl md:px-8 drop-shadow-lg">
        {text}
      </h2>
    </motion.div>
  );
}
