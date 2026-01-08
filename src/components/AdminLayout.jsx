import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const SIDEBAR_WIDTH = "w-64"; // keep consistent

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:fixed md:inset-y-0 md:left-0 md:${SIDEBAR_WIDTH} md:block bg-white z-40`}>
        <Sidebar />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white
        transform transition-transform duration-300 md:hidden
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="md:ml-64 h-screen overflow-y-auto bg-gray-50 p-4 md:p-6">
        <Outlet context={{ sidebarOpen, setSidebarOpen }} />
      </main>
    </div>
  );
};

export default AdminLayout;
