import React from "react";
import Navbar from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";


const DashboardPage = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
            <Navbar />
            <div className="flex flex-1">
                <Sidebar />
                <h2 className="text-2xl p-7 font-bold">Dashboard</h2>
            </div>
        </div>
    )
};
export default DashboardPage;