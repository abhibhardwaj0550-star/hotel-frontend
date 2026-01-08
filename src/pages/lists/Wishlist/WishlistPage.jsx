import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../lists/context/Appcontext";
import HomeCard from "../../../components/Card";
import Navbar from "../../../components/Header";

const WishlistPage = () => {
  const { wishlist, isLoggedIn, fetchWishlist } = useAppContext();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchWishlist(); // get wishlist from backend
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  if (!wishlist || wishlist.length === 0) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-24 text-gray-500">
          No items in your wishlist.
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="pt-24 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist.map((wish) => (
          <HomeCard
            key={wish._id}
            id={wish.itemId?._id}
            image={wish.itemId?.previewImage}
            title={wish.wishlistItem}
            rating={wish.itemId?.rating}
            price={wish.itemId?.rate}
            packageType={wish.itemId?.package}
          />
        ))}
      </div>
    </>
  );
};

export default WishlistPage;
