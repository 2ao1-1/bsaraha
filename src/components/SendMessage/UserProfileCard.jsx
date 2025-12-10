import { User } from "lucide-react";
import PropTypes from "prop-types";

export default function UserProfileCard({ userInfo, username }) {
  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 items-center text-center space-y-4">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-md flex items-center justify-center shadow-lg overflow-hidden">
        {userInfo?.profilePicture ? (
          <img
            src={userInfo.profilePicture}
            alt={userInfo.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={48} className="text-white" />
        )}
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-800">
          {userInfo?.fullName || "مستخدم"}
        </h2>
        <p className="text-gray-500 font-mono">@{username}</p>

        {userInfo?.bio && (
          <p className="text-gray-600 mt-2 max-w-md">{userInfo.bio}</p>
        )}
      </div>
    </div>
  );
}

UserProfileCard.propTypes = {
  userInfo: PropTypes.shape({
    profilePicture: PropTypes.string,
    fullName: PropTypes.string,
    bio: PropTypes.string,
  }),
  username: PropTypes.string,
  reloadUser: PropTypes.func,
};
