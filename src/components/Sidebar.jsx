import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logoVideo from "../assets/p.mp4";
import { useAppContext } from "../pages/lists/context/Appcontext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAppContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-52 h-screen bg-gradient-to-br from-[#1d3faa] to-[#fe6a3c] text-white p-3 flex flex-col">

      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 select-none mb-4 bg-white rounded-xl px-3 py-2">
          <video
            src={logoVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-xs font-semibold text-blue-700">
            PrimeStay Inn
          </span>
        </div>

        <NavItem to="/admin" icon="🛖" label="Dashboard" />
        <NavItem to="/admin/users" icon="👤" label="Users" />
        <NavItem to="/admin/reviews" icon="💫" label="Reviews" />
        <NavItem to="/admin/transactions" icon="💲" label="Transactions" />
        <NavItem to="/admin/content" icon="🧑‍💼" label="Content Management" />
        <NavItem to="/admin/contact" icon="📞" label="Contact" />
        <NavItem to="/admin/notification" icon="🔔" label="Notifications" />
        <NavItem to="/admin/dbbackup" icon="👁️‍🗨️" label="DB Backup" />
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto w-full flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-blue-700 text-xs font-semibold hover:bg-blue-50 transition cursor-pointer"
      >
        <span className="text-sm">⬅️</span>
        <span>Logout</span>
      </button>
    </div>
  );
};

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-1.5 mb-1 rounded-lg text-xs transition ${
        isActive
          ? "bg-white text-blue-700 font-semibold"
          : "text-white/90 hover:bg-white/10"
      }`
    }
  >
    <span className="text-sm w-4 text-center">{icon}</span>
    <span className="whitespace-nowrap">{label}</span>
  </NavLink>
);

export default Sidebar;
