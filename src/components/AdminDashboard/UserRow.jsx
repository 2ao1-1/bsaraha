import { Shield, ShieldOff, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

export default function UserRow({
  user,
  onPromote,
  onDemote,
  onDelete,
  actionLoading,
}) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
            {user.firstName?.[0] || user.username?.[0] || "U"}
          </div>
          <div>
            <p className="font-medium text-gray-800">
              {user.fullName || `${user.firstName} ${user.lastName}`}
            </p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-700">{user.email}</td>
      <td className="px-6 py-4">
        {user.isAdmin ? (
          <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <Shield size={16} /> أدمن
          </span>
        ) : (
          <span className="text-gray-500 text-sm">مستخدم</span>
        )}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(user.createdAt).toLocaleDateString("ar-EG")}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {!user.isAdmin ? (
            <button
              onClick={() => onPromote(user._id)}
              disabled={actionLoading === user._id}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50"
              title="ترقية إلى أدمن"
            >
              <Shield size={18} />
            </button>
          ) : (
            <button
              onClick={() => onDemote(user._id)}
              disabled={actionLoading === user._id}
              className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors disabled:opacity-50"
              title="إزالة صلاحيات الأدمن"
            >
              <ShieldOff size={18} />
            </button>
          )}

          <button
            onClick={() => onDelete(user._id)}
            disabled={actionLoading === user._id}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="حذف المستخدم"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    fullName: PropTypes.string,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    createdAt: PropTypes.string,
  }).isRequired,
  onPromote: PropTypes.func.isRequired,
  onDemote: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  actionLoading: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
