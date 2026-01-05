import { useOutletContext } from "react-router-dom";
import AdminHeader from "../../../components/admin/AdminHeader";
import menuIcon from "../../../assets/menu.png";

const DashboardPage = () => {
  const { setSidebarOpen } = useOutletContext(); // to toggle mobile menu

  return (
    <div>
      {/* Dashboard Header */}
      <AdminHeader
        title="Dashboard"
        subtitle="Overview of platform statistics and performance"
        menuIcon={menuIcon}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Dashboard Content */}
      <div className="bg-white rounded-xl p-6 shadow">
        Dashboard content goes here
      </div>
    </div>
  );
};

export default DashboardPage;
