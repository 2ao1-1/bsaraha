import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

HomeHero.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default function HomeHero({ title = "بصراحه", subtitle, description }) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16 h-[60vh] z-20 flex flex-col justify-center items-center"
    >
      <motion.h1
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-7xl md:text-9xl font-bold text-secondary-lighter mb-6 font-headers drop-shadow-2xl"
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl text-text-primary/90 mb-4 font-semibold"
      >
        {subtitle}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl text-text-primary/80 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
      >
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 text-lg hover:bg-primary/90 transform transition-all duration-200 shadow-2xl flex items-center gap-2 min-w-[200px] justify-center"
        >
          ابدأ الآن مجاناً
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 bg-transparent border-2 border-blue-700 text-secondary-lighter rounded-lg font-semibold text-lg hover:bg-primary/10 min-w-[200px]"
        >
          تسجيل الدخول
        </button>
      </motion.div>
    </motion.div>
  );
}
