import { Heart } from "lucide-react";
import { useAppContext } from "../pages/lists/context/Appcontext";
import { useNavigate } from "react-router-dom";

export default function HomeCard({ id, image, title, price = "₹5,000", rating = "4.9", nights = "2 nights" }) {
  const { toggleWishlist, isWishlisted, isLoggedIn, setShowAuthPopup } = useAppContext();
  const liked = isWishlisted(id);
  const navigate = useNavigate();

  const handleHeartClick = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      setShowAuthPopup(true);
      return;
    }

    toggleWishlist({ id, image, title, price, rating, nights });

    // Navigate to wishlist if adding first time
    if (!liked) {
      navigate("/wishlist");
    }
  };

  return (
    <div className="cursor-pointer w-full max-w-[230px]">
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
        <p className="text-[13px] font-semibold text-gray-900 leading-tight">{price}</p>
      </div>
    </div>
  );
}
