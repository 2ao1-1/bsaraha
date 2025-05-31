import SparkButton from "./SparkButton";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function SubmitBtn({ loading }) {
  return (
    <SparkButton
      type="submit"
      className="mt-4 bg-gray-600 text-white p-3 w-full rounded-md font-bold text-lg transition-all duration-300 hover:bg-gray-700 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={loading}
    >
      {loading ? (
        <span className="inline-flex items-center">
          جاري التسجيل...
          <motion.span
            className="mr-2 h-4 w-4 rounded-full border-2 border-primary-main border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </span>
      ) : (
        "تسجيل"
      )}
    </SparkButton>
  );
}
