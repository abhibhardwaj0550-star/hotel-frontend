import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 flex flex-col">
      <div>
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>

        <NavItem to="/admin" label="Dashboard" />
        <NavItem to="/admin/users" label="Users" />
        <NavItem to="/admin/reviews" label="Reviews" />
        <NavItem to="/admin/transactions" label="Transactions" />
        <NavItem to="/admin/content" label="Content Management" />
        <NavItem to="/admin/contact" label="Contact" />
        <NavItem to="/admin/notification" label="Notifications" />
        <NavItem to="/admin/dbbackup" label="DB Backup" />
      </div>

 
    </div>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 mb-2 rounded ${
        isActive ? "bg-gray-700" : "hover:bg-gray-800"
      }`
    }
  >
    {label}
  </NavLink>
);

export default Sidebar;
