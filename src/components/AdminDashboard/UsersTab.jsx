import { Loader2, RefreshCw, Search } from "lucide-react";
import Pagination from "./DashBoardPafination";
import EmptyState from "./EmptyDashboard";
import UserRow from "./UserRow";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function UsersTab({
  users,
  loading,
  searchQuery,
  setSearchQuery,
  onPromote,
  onDemote,
  onDelete,
  actionLoading,
  page,
  setPage,
  total,
  limit,
  onRefresh,
}) {
  const totalPages = Math.ceil(total / limit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          إدارة المستخدمين ({total})
        </h2>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث..."
              className="w-full pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 outline-none"
            />
          </div>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-all"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
        </div>
      ) : users.length > 0 ? (
        <>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      المستخدم
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      البريد
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      الحالة
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      التاريخ
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <UserRow
                      key={user._id}
                      user={user}
                      onPromote={onPromote}
                      onDemote={onDemote}
                      onDelete={onDelete}
                      actionLoading={actionLoading}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <EmptyState message="لا يوجد مستخدمين" />
      )}
    </motion.div>
  );
}

UsersTab.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  onPromote: PropTypes.func,
  onDemote: PropTypes.func,
  onDelete: PropTypes.func,
  actionLoading: PropTypes.bool,
  page: PropTypes.number,
  setPage: PropTypes.func,
  total: PropTypes.number,
  limit: PropTypes.number,
  onRefresh: PropTypes.func,
};
