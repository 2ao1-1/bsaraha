import { LogOut, Shield } from "lucide-react";
import PropTypes from "prop-types";

export default function DashboardHeader({ handleLogout }) {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield size={32} />
            <div>
              <h1 className="text-2xl font-bold">لوحة تحكم الأدمن</h1>
              <p className="text-sm text-white/80">إدارة المستخدمين والرسائل</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
          >
            <LogOut size={18} />
            خروج
          </button>
        </div>
      </div>
    </div>
  );
}

DashboardHeader.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};
