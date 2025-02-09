import { motion } from "framer-motion";
import { Mail } from "lucide-react";
<<<<<<< HEAD
=======

import Menu from "./Menu";
>>>>>>> 5aed53606338ad1761d563e05098db8e5ebb6538

export default function Navbar() {
  return (
    <motion.header
      className="bg-secondary-lighter"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", duration: 0.8 }}
    >
      <div className="flex space-x-4 p-4 text-primary-main justify-between items-center max-w-7xl mx-auto">
        <Logo />
        {children}
      </div>
    </motion.header>
  );
}

export function Logo() {
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
