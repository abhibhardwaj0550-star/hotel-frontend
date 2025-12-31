import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Lazy initialization for isLoggedIn and wishlist
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token"); // true if token exists
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [showAuthPopup, setShowAuthPopup] = useState(false);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    setShowAuthPopup(false);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setWishlist([]);
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    localStorage.removeItem("wishlist");
    localStorage.removeItem("role");
  };

  const toggleWishlist = (item) => {
    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    setWishlist((prev) =>
      prev.find((w) => w.id === item.id)
        ? prev.filter((w) => w.id !== item.id)
        : [...prev, item]
    );
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        wishlist,
        showAuthPopup,
        setShowAuthPopup,
        login,
        logout,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
