import React from "react";
import Navbar from "../../../components/Header";
import HomeCard from "../../../components/Card";
import Footer from "../../../components/Footer";

const HomePage = () => {
  const cards = Array.from({ length: 154 });

  const getImage = (index) =>
    index % 2 === 0
      ? "https://images.unsplash.com/photo-1566073771259-6a8506099945"
      : "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb";

  return (
    <>
      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
        <Navbar />
      </div>

      {/* PAGE CONTENT */}
      <main className="p-10 bg-fffff min-h-screen pt-24">
        <div className="max-w[1440px] mx-auto px-6">

          {/* PAGE TITLE */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 pt-15">
              Popular homes in Sahibzada Ajit Singh Nagar
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {cards.length} stays available
            </p>
          </div>

          {/* GRID LAYOUT */}
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-7
              xl:grid-cols-9
              gap-x-6
              gap-y-10
            "
          >
            {/* REQUIRED FOR WISHLIST */}
            {cards.map((_, index) => (
              <HomeCard
                key={index}
                id={index}
                image={getImage(index)}
                title={
                  index % 2 === 0
                    ? "Flat in Zirakpur"
                    : "Apartment in SAS Nagar"
                }
                price={`₹${(3000 + index * 10).toLocaleString()} for 2 nights`}
                rating={(4.8 + (index % 3) * 0.05).toFixed(2)}
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
