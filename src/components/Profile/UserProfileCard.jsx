import { motion } from "framer-motion";
import { User, Camera, Edit2, LogOut, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

export default function UserProfileCard({
  userData,
  profileImage,
  fileInputRef,
  showImageMenu,
  onToggleImageMenu,
  onChooseFile,
  onDeleteImage,
  onEditProfile,
  onUsernameEdit,
  onLogout,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={64} className="text-white" />
            )}
          </div>

          <button
            onClick={onToggleImageMenu}
            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-700 transition-colors"
            aria-label="toggle image menu"
          >
            <Camera size={20} />
          </button>

          {showImageMenu && (
            <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border overflow-hidden z-10">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-2 text-sm hover:bg-gray-50 text-right flex items-center gap-2"
              >
                <Camera size={16} /> تغيير الصورة
              </button>
              {profileImage && (
                <button
                  onClick={onDeleteImage}
                  className="w-full px-4 py-2 text-sm hover:bg-gray-50 text-right flex items-center gap-2 text-red-600"
                >
                  <Trash2 size={16} /> حذف الصورة
                </button>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onChooseFile}
            className="hidden"
          />
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-800">
            {userData.fullName}
          </h2>
          <p className="text-gray-500 font-mono">@{userData.username}</p>
          {userData.bio && (
            <p className="text-gray-600 text-sm max-w-md">{userData.bio}</p>
          )}
        </div>

        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={onEditProfile}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
          >
            <Edit2 size={18} /> تعديل البيانات
          </button>

          {!userData.usernameEdited && (
            <button
              onClick={onUsernameEdit}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-all"
            >
              <Edit2 size={18} /> تعديل اسم المستخدم
            </button>
          )}

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all"
          >
            <LogOut size={18} /> خروج
          </button>
        </div>
      </div>
    </motion.div>
  );
}

UserProfileCard.propTypes = {
  userData: PropTypes.object.isRequired,
  profileImage: PropTypes.string,
  fileInputRef: PropTypes.object,
  showImageMenu: PropTypes.bool,
  onToggleImageMenu: PropTypes.func.isRequired,
  onChooseFile: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  onUsernameEdit: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
