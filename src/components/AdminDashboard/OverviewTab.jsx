import { motion } from "framer-motion";
import {
  Loader2,
  MessageCircle,
  RefreshCw,
  Shield,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react";
import ActivityItem from "./ActivityItem";
import PropTypes from "prop-types";

export default function OverviewTab({ stats, loading, onRefresh }) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex justify-center items-center py-20"
      >
        <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
      </motion.div>
    );
  }

  const statCards = [
    {
      title: "إجمالي المستخدمين",
      value: stats?.totalUsers || 0,
      icon: <Users size={32} />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "عدد الأدمنز",
      value: stats?.totalAdmins || 0,
      icon: <Shield size={32} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "إجمالي الرسائل",
      value: stats?.totalMessages || 0,
      icon: <MessageCircle size={32} />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "رسائل مع ردود",
      value: stats?.messagesWithReplies || 0,
      icon: <TrendingUp size={32} />,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">نظرة عامة</h2>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
        >
          <RefreshCw size={18} />
          تحديث
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-14 h-14 ${card.bgColor} rounded-lg flex items-center justify-center ${card.textColor}`}
              >
                {card.icon}
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-800">
              {card.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      {stats?.recentUsers && stats.recentUsers.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            آخر المستخدمين المسجلين
          </h3>
          <div className="space-y-3">
            {stats.recentUsers.map((user, index) => (
              <ActivityItem
                key={index}
                icon={<UserPlus size={20} className="text-blue-600" />}
                text={`${user.firstName} ${user.lastName} (@${user.username})`}
                time={new Date(user.createdAt).toLocaleDateString("ar-EG")}
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

OverviewTab.propTypes = {
  stats: PropTypes.shape({
    totalUsers: PropTypes.number,
    totalAdmins: PropTypes.number,
    totalMessages: PropTypes.number,
    messagesWithReplies: PropTypes.number,
    recentUsers: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        username: PropTypes.string,
        createdAt: PropTypes.string,
      })
    ),
  }),
  loading: PropTypes.bool,
  onRefresh: PropTypes.func,
};

OverviewTab.defaultProps = {
  stats: {},
  loading: false,
  onRefresh: () => {},
};
