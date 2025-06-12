import { Link } from "react-router-dom";

const menuItems = [
  { icon: "📂", path: "/login", name: "دخول" },
  { icon: "➕", path: "/register", name: "إنشاء حساب" },
];

// eslint-disable-next-line react/prop-types
export default function Menu({ userView }) {
  return (
    <div className="relative" dir="rtl">
      <nav className="flex justify-center">
        <ul className="flex flex-row gap-8 items-center">
          {userView === "user" ? (
            <MenuLink icon="🏠" name="الصفحة الرئيسية" path="/profile" />
          ) : (
            menuItems.map((item) => <MenuLink key={item.path} {...item} />)
          )}
        </ul>
      </nav>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
export function MenuLink({ name, path, icon }) {
  return (
    <li className="bg-gray-600 hover:bg-gray-700 rounded-md">
      <Link
        to={path}
        className={`
          block w-full p-1 rounded-md
          transition-colors md:flex items-center flex-wrap  
        `}
      >
        {icon} <span className="hidden md:block">{name}</span>
      </Link>
    </li>
  );
}
