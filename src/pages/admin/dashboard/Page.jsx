import { useOutletContext } from "react-router-dom";
import AdminHeader from "../../../components/admin/AdminHeader";
import menuIcon from "../../../assets/menu.png";

const DashboardPage = () => {
  const { setSidebarOpen } = useOutletContext(); // to toggle mobile menu

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {/* Dashboard Header */}
      <AdminHeader
        title="Dashboard"
        subtitle="Overview of platform statistics and performance"
        menuIcon={menuIcon}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Dashboard Content */}
      <div className="bg-white rounded-xl p-6 shadow">
        <p className="text-gray-700">
          Dashboard content goes here
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
