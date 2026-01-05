import React from "react";

export default function AdminHeader({
  title,
  subtitle,
  bgColor = "bg-[#5457a6]",
  menuIcon,
  onMenuClick,
  rightContent,
}) {
  return (
    <div
      className={`${bgColor} rounded-2xl px-5 py-4 text-white mb-6 flex items-center justify-between`}
    >
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm opacity-90">{subtitle}</p>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {rightContent}

        {/* Dynamic Menu Icon (GLOBAL) */}
        {menuIcon && (
          <img
            src={menuIcon}
            alt="menu"
            className="w-8 h-8 cursor-pointer md:hidden"
            onClick={onMenuClick}
          />
        )}
      </div>
    </div>
  );
}
