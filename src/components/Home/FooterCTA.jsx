import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function FooterCTA() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6 }} className="text-center mt-20">
      <button onClick={() => navigate("/register")} className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 text-xl hover:scale-105 transition-all duration-200 shadow-2xl inline-flex items-center gap-3">
        سجل الآن مجاناً
      </button>
    </motion.div>
  );
}
