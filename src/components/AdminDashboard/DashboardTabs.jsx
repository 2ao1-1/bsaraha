import { BarChart3, MessageCircle, Users } from "lucide-react";
import TabButton from "./TabButton";
import PropTypes from "prop-types";

export default function DashboardTabs({
  activeTab,
  setActiveTab,
  usersTotal,
  messagesTotal,
}) {
  return (
    <div className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex gap-1">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<BarChart3 size={20} />}
            label="نظرة عامة"
          />
          <TabButton
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            icon={<Users size={20} />}
            label="المستخدمين"
            badge={usersTotal}
          />
          <TabButton
            active={activeTab === "messages"}
            onClick={() => setActiveTab("messages")}
            icon={<MessageCircle size={20} />}
            label="الرسائل"
            badge={messagesTotal}
          />
        </div>
      </div>
    </div>
  );
}

DashboardTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  usersTotal: PropTypes.number.isRequired,
  messagesTotal: PropTypes.number.isRequired,
};
