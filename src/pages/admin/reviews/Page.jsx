import { useOutletContext } from "react-router-dom";
import AdminHeader from "../../../components/admin/AdminHeader";
import menuIcon from "../../../assets/menu.png";

const ReviewsPage = () => {
  const { setSidebarOpen } = useOutletContext(); // mobile sidebar toggle

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {/* Page Header */}
      <AdminHeader
        title="Reviews"
        subtitle="View and manage all user reviews"
        menuIcon={menuIcon}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Page Content */}
      <div className="bg-white rounded-xl shadow p-6 mt-6">
        <p className="text-gray-700">
          Reviews content will appear here.
        </p>
      </div>
    </div>
  );
};

export default ReviewsPage;
