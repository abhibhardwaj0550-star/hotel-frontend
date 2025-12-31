import React from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Header";


const ContentPage = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
            <Navbar />

            <div className="flex flex-1">
                <Sidebar />
                <h2 className="text-2xl p-7 font-bold">Content Management</h2>
            </div>
        </div>
    )
};


export default ContentPage;