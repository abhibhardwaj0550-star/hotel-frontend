import React from "react";

const ProfilePage = () => {
  // Get logged-in user (same logic as your context)
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Guest";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT SIDEBAR */}
      <div className="w-[280px] border-r border-gray-200 px-6 py-10">
        <h2 className="text-2xl font-semibold mb-8">Profile</h2>

        <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-2 mb-3 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold">
            {firstLetter}
          </div>
          <span className="font-medium">About me</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer mb-2">
          <span>🧳</span>
          <span className="font-medium">Past trips</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer">
          <span>👥</span>
          <span className="font-medium">Connections</span>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 px-12 py-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">About me</h2>
          <button className="border border-gray-300 rounded-full px-4 py-1 text-sm font-medium hover:bg-gray-100">
            Edit
          </button>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white w-[320px] rounded-2xl shadow-lg p-10 text-center mb-10">
          <div className="w-24 h-24 mx-auto rounded-full bg-black text-white flex items-center justify-center text-4xl font-semibold mb-4">
            {firstLetter}
          </div>
          <h3 className="text-xl font-semibold">{userName}</h3>
          <p className="text-gray-500">Guest</p>
        </div>

        {/* COMPLETE PROFILE */}
        <div className="max-w-md mb-10">
          <h3 className="text-xl font-semibold mb-2">
            Complete your profile
          </h3>
          <p className="text-gray-600 mb-4">
            Your profile is an important part of every reservation. Create yours
            to help other hosts and guests get to know you.
          </p>
          <button className="bg-rose-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-rose-600">
            Get started
          </button>
        </div>

        {/* REVIEWS */}
        <div className="flex items-center gap-3 text-gray-800 font-medium">
          <span>💬</span>
          <span>Reviews I’ve written</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
