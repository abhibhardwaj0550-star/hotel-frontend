import { Heart } from "lucide-react";
import { useAppContext } from "../pages/lists/context/Appcontext";
import { useNavigate } from "react-router-dom";

export default function HomeCard({ id, image, title, price, rating, nights }) {
  const { toggleWishlist, isWishlisted, isLoggedIn, setShowAuthPopup } = useAppContext();
  const liked = isWishlisted(id);
  const navigate = useNavigate();

  // Convert price to number safely
  const numericPrice = typeof price === "number"
    ? price
    : parseInt(String(price).replace(/\D/g, '')) || 0;

  const displayPrice = typeof price === "number"
    ? `₹${price.toLocaleString()} for ${nights}`
    : price; // use original string if already formatted

  const handleHeartClick = (e) => {
    e.stopPropagation(); // prevent card click navigation

    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    toggleWishlist({
      _id: id,
      previewImage: image,
      package: title,
      rate: numericPrice,
      rating,
      nights,
    });

    if (!liked) {
      navigate("/wishlist");
    }
  };

  const handleCardClick = () => {
    navigate(`/details/${id}`); // navigate to details page
  };

  return (
    <div
      className="cursor-pointer w-full max-w-[230px] hover:shadow-lg transition rounded-xl"
      onClick={handleCardClick} // card click
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-xl"
        />

        <button
          onClick={handleHeartClick}
          className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow hover:scale-110 transition"
        >
          <Heart
            size={16}
            className={liked ? "fill-red-500 text-red-500" : "text-gray-600"}
          />
        </button>
      </div>

      <div className="mt-1 space-y-0.5">
        <div className="flex justify-between items-start">
          <h3 className="text-[13px] font-medium text-gray-800 truncate leading-tight">
            {title}
          </h3>
          <span className="text-[12px] text-gray-700 flex items-center gap-0.5 whitespace-nowrap">
            ⭐ {rating}
          </span>
        </div>
        <p className="text-[12px] text-gray-500 leading-tight">{nights}</p>
        <p className="text-[13px] font-semibold text-gray-900 leading-tight">
          {displayPrice}
        </p>
      </div>
    </div>
  );
}
