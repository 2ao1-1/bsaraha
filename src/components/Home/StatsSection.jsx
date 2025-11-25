import { motion } from "framer-motion";

export default function StatsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="mt-20 text-center w-full mx-auto"
    >
      <div className="max-w-6xl mx-auto justify-between flex flex-col sm:flex-row gap-8 sm:gap-16 bg-secondary-lighter/30 backdrop-blur-md rounded-2xl p-8 border border-primary/20">
        <div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4, type: "spring" }} className="text-5xl font-bold text-text-primary mb-2">+١٠ ألف</motion.div>
          <div className="text-text-primary/80">مستخدم نشط</div>
        </div>

        <div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }} className="text-5xl font-bold text-text-primary mb-2">+١٠٠ ألف</motion.div>
          <div className="text-text-primary/80">رسالة تم إرسالها</div>
        </div>

        <div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, type: "spring" }} className="text-5xl font-bold text-text-primary mb-2">٩٩٪</motion.div>
          <div className="text-text-primary/80">رضا المستخدمين</div>
        </div>
      </div>
    </motion.div>
  );
}
