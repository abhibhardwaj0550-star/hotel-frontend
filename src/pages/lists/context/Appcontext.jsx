import { createContext, useContext, useState, useEffect } from "react";
import Axios from "../../../components/Axios"; 

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const [wishlist, setWishlist] = useState([]);
  const [showAuthPopup, setShowAuthPopup] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  /* =========================
     FETCH WISHLIST
     ========================= */
  const fetchWishlist = async () => {
    if (!userId) return;

    try {
      const res = await Axios.get(`/wishlist/person/${userId}`);
      setWishlist(res.data);
    } catch (error) {
      console.error("Fetch wishlist failed", error);
    }
  };

  /* =========================
     ADD TO WISHLIST
     ========================= */
  const addToWishlist = async (hotel) => {
    try {
      await Axios.post("/wishlist", {
        personId: userId,
        name: user?.name || "User",
        itemId: hotel._id,
        wishlistItem: hotel.package || hotel.title,
      });

      fetchWishlist();
    } catch (error) {
      console.error("Add wishlist failed", error);
    }
  };

  /* =========================
     REMOVE FROM WISHLIST
     ========================= */
  const removeFromWishlist = async (wishlistId) => {
    try {
      await Axios.delete(`/wishlist/${wishlistId}`);
      fetchWishlist();
    } catch (error) {
      console.error("Remove wishlist failed", error);
    }
  };

  /* =========================
     TOGGLE WISHLIST
     ========================= */
  const toggleWishlist = async (hotel) => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    const existing = wishlist.find((w) => w.itemId?._id === hotel._id);

    if (existing) {
      await removeFromWishlist(existing._id);
    } else {
      await addToWishlist(hotel);
    }
  };

  /* =========================
     CHECK IF WISHLISTED
     ========================= */
  const isWishlisted = (hotelId) =>
    wishlist.some((w) => w.itemId?._id === hotelId);

  /* =========================
     LOGIN / LOGOUT
     ========================= */
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setShowAuthPopup(false);
    fetchWishlist();
  };
   const register = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setShowAuthPopup(false);
    fetchWishlist();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setWishlist([]);
    localStorage.clear();
  };

  /* =========================
     AUTO FETCH ON LOGIN
     ========================= */
  useEffect(() => {
    if (isLoggedIn) {
      fetchWishlist();
    }
  }, [isLoggedIn]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        wishlist,
        showAuthPopup,
        setShowAuthPopup,
        login,
        register,
        logout,
        toggleWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
