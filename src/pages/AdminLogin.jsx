import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import AdminLoginForm from "../components/Admin/AdminLoginForm";

export default function AdminLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (adminToken) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className=" flex items-center justify-center p-4 inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-20"
      >
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-secondary-lighter hover:text-secondaty-main/80 transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>العودة للرئيسية</span>
        </button>

        <AdminLoginForm />
      </motion.div>
    </div>
  );
}
