import { useOutletContext } from "react-router-dom";
import AdminHeader from "../../../components/admin/AdminHeader";
import menuIcon from "../../../assets/menu.png";

const DbBackupPage = () => {
  const { setSidebarOpen } = useOutletContext(); // mobile menu toggle

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {/* Page Header */}
      <AdminHeader
        title="Database Backup"
        subtitle="Manage and download system database backups"
        menuIcon={menuIcon}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Page Content */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <p className="text-gray-700">
          Database backup functionality will be available here.
        </p>
      </div>
    </div>
  );
};

export default DbBackupPage;
