import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="block md:hidden p-2 bg-accent-darker text-white rounded-md hover:bg-accent-lighter"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        القائمة
      </button>

      <nav className="hidden md:flex justify-center">
        <MenuLinks />
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          id="mobile-menu"
          className="absolute top-12 left-0 w-72 bg-primary-main text-secondary-darker font-bold shadow-lg rounded-md overflow-hidden p-2"
        >
          <div className="flex flex-col p-2">
            <button
              className="self-end p-2 bg-accent-darker text-white rounded-full hover:bg-accent-lighter"
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <X />
            </button>
            <MenuLinks mobile={true} />
          </div>
        </motion.div>
      )}
    </div>
  );
}

function MenuLinks({ mobile }) {
  const links = [
    { name: "الصفحة الرئيسية", path: "/" },
    { name: "تسجيل الدخول", path: "/Login" },
    { name: "إنشاء حساب", path: "/Register" },
  ];

  return (
    <ul
      className={`${
        mobile
          ? "flex flex-col space-y-2 py-2"
          : "flex flex-row gap-8 items-center"
      }`}
    >
      {links.map((link, index) => (
        <li
          key={index}
          className="p-2 rounded hover:bg-text-secondary/20 cursor-pointer"
        >
          <Link className="hover:underline block w-full" to={link.path}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
