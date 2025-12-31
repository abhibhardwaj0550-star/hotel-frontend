import React from "react";
import Navbar from "../../../components/Header";
import HomeCard from "../../../components/Card";
import Footer from "../../../components/Footer";

const categories = [
  { name: "Photography", status: "2 available" },
  { name: "Chefs", status: "Coming soon" },
  { name: "Prepared meals", status: "Coming soon" },
  { name: "Massage", status: "Coming soon" },
  { name: "Training", status: "Coming soon" },
  { name: "Make-up", status: "Coming soon" },
  { name: "Hair", status: "Coming soon" },
  { name: "Spa treatments", status: "Coming soon" },
  { name: "Catering", status: "Coming soon" },
  { name: "Nails", status: "Coming soon" },
];

const services = Array.from({ length: 18 }).map((_, index) => ({
  title:
    index % 2 === 0
      ? "Authentic Roman meal"
      : "Hyperlocal, foraged fare",
  price: `₹${(6000 + index * 400).toLocaleString()} / guest`,
  rating: (4.8 + (index % 3) * 0.05).toFixed(2),
  image:
    index % 2 === 0
      ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945",
}));

export default function Services() {
  return (
    <>
      {/* FIXED NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
        <Navbar />
      </div>

      {/* PAGE CONTENT */}
      <main className="p-10 bg-white min-h-screen">
        <div className="max-w[1440px] mx-auto px-6">

          {/* PAGE TITLE */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 pt-15">
              Services in New Delhi
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {categories.length} categories available
            </p>
          </div>

          {/* CATEGORIES (MINIMAL STYLE) */}
          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-3
              md:grid-cols-5
              lg:grid-cols-7
              xl:grid-cols-9
              gap-4
              mb-14
            "
          >
            {categories.map((item, index) => (
              <div
                key={index}
                className="
                  border
                  rounded-xl
                  px-3
                  py-2
                  text-center
                  text-sm
                  hover:shadow-md
                  transition
                  cursor-pointer
                "
              >
                <p className="font-medium text-gray-800 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.status}
                </p>
              </div>
            ))}
          </div>

          {/* SERVICES GRID (HOME STYLE) */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Chefs
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {services.length} services available
            </p>
          </div>

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
            {services.map((item, index) => (
              <HomeCard
                key={index}
                image={item.image}
                title={item.title}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
<Footer/>
        </div>
      </main>
    </>
  );
}
