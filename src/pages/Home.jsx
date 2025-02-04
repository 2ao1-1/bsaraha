import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import Menu from "./components/Menu";
import { motion } from "framer-motion";
import SparkButton from "./components/SparkButton";

export default function Home() {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <motion.header
        className="bg-secondary-lighter"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
      >
        <div className="flex space-x-4 p-4 text-primary-main justify-between items-center max-w-7xl mx-auto">
          <Logo />
          <Menu />
        </div>
      </motion.header>

      <main className="flex-grow bg-gradient-to-b from-primary-lighter to-primary-lighter/95">
        <div className="w-full h-full min-h-[calc(100vh-80px)] text-center flex flex-col justify-center items-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold font-headers text-secondary-lighter drop-shadow-xl mb-10"
            >
              بصراحه
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body mb-8 text-lg md:text-xl"
            >
              هل أنت مستعد لمعرفة ملاحظات الناس عنك بدون أن تعرف المرسل ؟ 🤩
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center"
            >
              <SparkButton
                className="mt-5 px-6 py-3 bg-secondary-lighter hover:bg-secondary-darker text-white rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate("/Login")}
                sparkColor="#FFD700"
                sparkSize={8}
                sparkRadius={20}
              >
                دخول
              </SparkButton>

              <SparkButton
                className="mt-5 px-6 py-3 bg-secondary-lighter hover:bg-secondary-darker text-white rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate("/Register")}
                sparkColor="#FFD700"
                sparkSize={8}
                sparkRadius={20}
              >
                سجل الآن
              </SparkButton>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function Logo() {
  return (
    <motion.div
      className="flex gap-4 items-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <motion.div
        initial={{ rotate: -20 }}
        animate={{ rotate: 20 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <Mail size={40} />
      </motion.div>
      <h2 className="text-4xl font-headers">بصراحه</h2>
    </motion.div>
  );
}
