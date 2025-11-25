import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Auth/LoginForm";
import { isTokenValid } from "../helpers/TokenValidation";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) navigate("/profile", { replace: true });
  }, [navigate]);

  return (
    <div className="absolute flex items-center justify-center p-4 inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-30"
      >
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold text-secondary-lighter mb-2 font-headers">
            بصراحه
          </h1>
        </div>

        <LoginForm />
      </motion.div>
    </div>
  );
}
