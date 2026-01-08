import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import menuIcon from "../assets/menu.png";
import homeIcon from "../assets/home.png";
import servicesIcon from "../assets/services.png";
import experienceIcon from "../assets/experience.png";
import logoVideo from "../assets/p.mp4";
import Popup from "./Popup";
import Auth from "./Auth"; // import the new Auth component
import { useAppContext } from "../pages/lists/context/Appcontext";

export default function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const {
    wishlist,
    isLoggedIn,
    logout,
  } = useAppContext();

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 pb-1 transition ${
      isActive
        ? "text-black border-b-2 border-bg-black"
        : "text-white hover:text-black"
    }`;

  return (
    <>
      <nav className="w-full h-16 bg-gradient-to-r from-[#fc815c] via-[#6b6dfd] to-[#1849ea]
 shadow-md flex items-center px-6 relative z-50">
        {/* Logo */}
        <div className="flex items-center gap-2 select-none">
          <video
            src={logoVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-xl font-bold text-blue-600">PrimeStay Inn</span>
        </div>

        {/* Center Links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex gap-10 font-medium">
          <NavLink to="/" className={navLinkClass}>
            <img src={homeIcon} alt="Homes" className="w-5 h-5" />
            Homes
          </NavLink>
          <NavLink to="/services" className={navLinkClass}>
            <img src={servicesIcon} alt="Services" className="w-5 h-5" />
            Services
          </NavLink>
          <NavLink to="/experiences" className={navLinkClass}>
            <img src={experienceIcon} alt="Experiences" className="w-5 h-5" />
            Experiences
          </NavLink>
        </div>

        {/* Menu Icon */}
        <button onClick={() => setMenuOpen(true)} className="ml-auto relative">
          <img src={menuIcon} alt="menu" className="w-8 h-8" />
          {wishlist.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {wishlist.length}
            </span>
          )}
        </button>
      </nav>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/10 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-20 right-6 z-50 w-64 bg-white rounded-xl shadow-xl p-5">
            <div className="flex justify-end mb-4">
              <button onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            <div className="flex flex-col gap-4 text-gray-700 mb-6 md:hidden">
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Homes
              </NavLink>
              <NavLink to="/services" onClick={() => setMenuOpen(false)}>
                Services
              </NavLink>
              <NavLink to="/experiences" onClick={() => setMenuOpen(false)}>
                Experiences
              </NavLink>
            </div>

            {/* PROFILE BUTTON */}
            {isLoggedIn && (
              <button
                className="w-full px-3 py-2 border border-gray-300 text-gray-800 rounded-md mb-2 hover:bg-gray-100"
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
              >
                Profile
              </button>
            )}

            <button
              className="w-full px-3 py-2 border border-blue-600 text-blue-600 rounded-md mb-2"
              onClick={() => {
                if (!isLoggedIn) {
                  setAuthMode("login");
                  setShowAuthPopup(true);
                } else {
                  navigate("/wishlist");
                }
                setMenuOpen(false);
              }}
            >
              Wishlist ({wishlist.length})
            </button>

            <button
              className={`w-full px-3 py-2 border rounded-md ${
                isLoggedIn
                  ? "border-red-600 text-red-600"
                  : "border-blue-600 text-blue-600"
              }`}
              onClick={() => {
                if (isLoggedIn) {
                  logout();
                  navigate("/");
                } else {
                  setAuthMode("login");
                  setShowAuthPopup(true);
                }
                setMenuOpen(false);
              }}
            >
              {isLoggedIn ? "Logout" : "Login or Signup"}
            </button>
          </div>
        </>
      )}

      {/* Auth Popup */}
      <Popup open={showAuthPopup} onClose={() => setShowAuthPopup(false)}>
        <Auth
          initialMode={authMode}
          onClose={() => setShowAuthPopup(false)}
        />
      </Popup>
    </>
  );
}
