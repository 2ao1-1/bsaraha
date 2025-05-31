import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

import SparkButton from "../components/SparkButton";

export default function Home() {
  const navigate = useNavigate();

  // if user is logged in, redirect to profile
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        const token = userData?.token;
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            navigate("/profile");
          } else {
            localStorage.removeItem("userData");
          }
        }
      } catch {
        localStorage.removeItem("userData");
      }
    }
  }, [navigate]);

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
    <div className="h-screen flex">
      <main className="flex-grow bg-gradient-to-br from-gray-600 to-gray-700">
        <div className="w-full h-full min-h-[calc(100vh-80px)] text-center flex flex-col justify-center items-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={itemVariants}
              className="text-6xl md:text-8xl font-bold font-headers text-white drop-shadow-xl mb-10"
            >
              بصراحه
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body mb-8 text-xl text-white"
            >
              هل أنت مستعد لمعرفة ملاحظات الناس عنك بدون أن تعرف المرسل ؟ 🤩
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-4 justify-center"
            >
              <Btn text="تسجيل الدخول" to={"/Login"} />
              <Btn text="انشاء حساب" to={"/Register"} />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function Btn({ text, to }) {
  const navigate = useNavigate();

  return (
    <SparkButton
      className="mt-5 px-6 py-3 bg-gray-300 hover:bg-gray-900 text-gray-900 hover:text-gray-100 rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg"
      onClick={() => navigate(to)}
      sparkProps={{
        sparkColor: "#fff",
        sparkSize: 8,
        sparkRadius: 25,
        sparkCount: 16,
        duration: 400,
        extraScale: 1.5,
      }}
    >
      {text}
    </SparkButton>
  );
}
