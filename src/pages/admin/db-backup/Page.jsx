import React from "react";
import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Header";


const DbBackupPage = () => {
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-white border-b">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <h2 className="text-2xl p-7 font-bold">Database Backup</h2>
            </div>
        </div>
    )
};


export default DbBackupPage;