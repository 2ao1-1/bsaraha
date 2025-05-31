import { Link } from "react-router-dom";

const menuItems = [
  { name: "تسجيل الدخول", path: "/login" },
  { name: "إنشاء حساب", path: "/register" },
];

// eslint-disable-next-line react/prop-types
export default function Menu({ userView }) {
  return (
    <div className="relative" dir="rtl">
      <nav className="flex justify-center">
        <ul className="flex flex-row gap-8 items-center">
          {userView === "user" ? (
            <MenuLink name="الصفحة الشخصية" path="/profile" />
          ) : (
            menuItems.map((item) => <MenuLink key={item.path} {...item} />)
          )}
        </ul>
      </nav>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
export function MenuLink({ name, path }) {
  return (
    <li className="bg-gray-600 hover:bg-gray-700 rounded-md">
      <Link
        to={path}
        className={`
          block w-full p-2 rounded-md
          transition-colors
        `}
      >
        {name}
      </Link>
    </li>
  );
}
