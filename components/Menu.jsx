import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Menu as MenuIcon } from "lucide-react";

const menuItems = [
  { name: "الصفحة الرئيسية", path: "/" },
  { name: "تسجيل الدخول", path: "/login" },
  { name: "إنشاء حساب", path: "/register" },
];

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative" dir="rtl">
      <button
        className="block md:hidden p-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <span className="flex items-center gap-2">
          <MenuIcon size={20} />
          القائمة
        </span>
      </button>

      <nav className="hidden md:flex justify-center">
        <ul className="flex flex-row gap-8 items-center">
          {menuItems.map((item) => (
            <MenuLink key={item.path} {...item} />
          ))}
        </ul>
      </nav>

      {isOpen && (
        <div
          id="mobile-menu"
          className="absolute top-12 left-0 w-40 bg-primary-main text-text-primary font-medium shadow-lg rounded-md overflow-hidden z-50"
        >
          <div className="flex flex-col p-2 ">
            <button
              className="self-end p-2 text-primary-main bg-accent-lighter hover:bg-accent-darker rounded-full transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق القائمة"
            >
              <X size={20} />
            </button>
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <MenuLink key={item.path} {...item} mobile />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function MenuLink({ name, path, mobile }) {
  return (
    <li className="hover:bg-secondary-darker rounded-md">
      <Link
        to={path}
        className={`
          block w-full p-2 rounded-md
          ${mobile ? "hover:bg-primary-darker" : "hover:text-primary-main"}
          transition-colors
        `}
      >
        {name}
      </Link>
    </li>
  );
}
