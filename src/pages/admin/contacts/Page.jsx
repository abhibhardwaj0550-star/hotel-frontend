import React from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Header";

const ContactPage = () => {
  return (
      <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
    
      <Navbar />

      <div className="flex flex-1">
      
        <Sidebar />

        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>

          <form className="space-y-3 max-w-md">
            <input
              className="border p-2 w-full"
              placeholder="Name"
            />
            <input
              className="border p-2 w-full"
              placeholder="Email"
            />
            <textarea
              className="border p-2 w-full"
              placeholder="Message"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
