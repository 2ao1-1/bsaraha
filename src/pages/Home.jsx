import { useEffect } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

import { jwtDecode } from "jwt-decode";
=======

>>>>>>> 5aed53606338ad1761d563e05098db8e5ebb6538
import { motion } from "framer-motion";

import SparkButton from "./components/SparkButton";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import Menu from "./components/Menu";
=======
import decodeJWT from "./components/jwt";
>>>>>>> 5aed53606338ad1761d563e05098db8e5ebb6538

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      try {
        const userData = JSON.parse(storedUserData);
        const token = userData?.token;
        if (token) {
          const decoded = decodeJWT(token);
          if (decoded.exp * 1000 > Date.now()) {
            navigate("/Profile");
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
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <Menu />
      </Navbar>
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
<<<<<<< HEAD
                sparkProps={{
                  sparkColor: "#fff",
                  sparkSize: 8,
                  sparkRadius: 25,
                  sparkCount: 16,
                  duration: 400,
                  extraScale: 1.5,
                }}
=======
>>>>>>> 5aed53606338ad1761d563e05098db8e5ebb6538
              >
                دخول
              </SparkButton>
              <SparkButton
                className="mt-5 px-6 py-3 bg-secondary-lighter hover:bg-secondary-darker text-white rounded-lg font-bold text-lg transition-all duration-300 hover:shadow-lg"
                onClick={() => navigate("/Register")}
<<<<<<< HEAD
                sparkProps={{
                  sparkColor: "#fff",
                  sparkSize: 8,
                  sparkRadius: 25,
                  sparkCount: 16,
                  duration: 400,
                  extraScale: 1.5,
                }}
=======
>>>>>>> 5aed53606338ad1761d563e05098db8e5ebb6538
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
