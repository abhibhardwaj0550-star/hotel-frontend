import { useOutletContext } from "react-router-dom";
import AdminHeader from "../../../components/admin/AdminHeader";
import menuIcon from "../../../assets/menu.png";

const NotificationPage = () => {
  const { setSidebarOpen } = useOutletContext(); // toggle mobile sidebar

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {/* Page Header */}
      <AdminHeader
        title="Notifications"
        subtitle="View and manage system notifications"
        menuIcon={menuIcon}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Page Content */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <p className="text-gray-700">
          Notification features will appear here.
        </p>
      </div>
    </div>
  );
};

export default NotificationPage;
