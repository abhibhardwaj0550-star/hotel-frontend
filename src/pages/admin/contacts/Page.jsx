import { useOutletContext } from "react-router-dom";
import AdminHeader from "../../../components/admin/AdminHeader";
import menuIcon from "../../../assets/menu.png";

const ContactPage = () => {
  const { setSidebarOpen } = useOutletContext(); // To toggle mobile sidebar

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {/* Page Header */}
      <AdminHeader
        title="Contact"
        subtitle="Get in touch with us"
        menuIcon={menuIcon}
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Page Content */}
      <div className="bg-white rounded-xl p-6 shadow mt-6 max-w-lg mx-auto">
        <form className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
          />
          <textarea
            className="border p-2 w-full rounded"
            placeholder="Message"
            rows={4}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
