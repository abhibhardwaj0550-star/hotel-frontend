import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../lists/context/Appcontext";
import HomeCard from "../../../components/Card";
import Navbar from "../../../components/Header";

const WishlistPage = () => {
  const { wishlist, isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  if (wishlist.length === 0) {
    return (
      <>
        <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
          <Navbar />
        </div>
        <p className="text-center mt-24 text-gray-500">
          No items in your wishlist.
        </p>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
        <Navbar />
      </div>

      <div className="pt-24 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map((item) => (
          <HomeCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
};

export default WishlistPage;
