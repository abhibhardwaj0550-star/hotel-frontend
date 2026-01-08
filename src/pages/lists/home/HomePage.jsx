import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate
import Navbar from "../../../components/Header";
import HomeCard from "../../../components/Card";
import Footer from "../../../components/Footer";
import Axios from "../../../components/Axios";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ initialize navigate

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await Axios.get("/hotel/get");
        if (res.data.success) {
          setHotels(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleCardClick = (hotelId) => {
    navigate(`/details/${hotelId}`); // navigate to /details/:id
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
        <Navbar />
      </div>

      <main className="p-10 bg-fffff min-h-screen">
        <div className="max-w[1440px] mx-auto px-6">
          <div className="mb-6 pt-20">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Popular homes in Sahibzada Ajit Singh Nagar
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {loading ? "Loading..." : `${hotels.length} stays available`}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-9 gap-x-6 gap-y-10">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-40 bg-gray-200 animate-pulse rounded-xl"
                  />
                ))
              : hotels.map((hotel) => (
                  <HomeCard
                    key={hotel._id}
                    id={hotel._id}
                    image={hotel.previewImage}
                    title={hotel.package}
                    price={`₹${hotel.rate.toLocaleString()} for 2 nights`}
                    rating={hotel.rating.toFixed(1)}
                    nights="2 nights"
                    onClick={() => handleCardClick(hotel._id)} // ✅ click handler
                  />
                ))}
          </div>

          <Footer />
        </div>
      </main>
    </>
  );
};

export default HomePage;
