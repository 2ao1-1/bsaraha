import PropTypes from "prop-types";

export default function AdminHeader({
  title = "لوحة تحكم الأدمن",
  subtitle = "تسجيل الدخول للوصول إلى لوحة التحكم",
}) {
  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"></div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}

AdminHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};
