import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Auth from "./components/Auth";

import DashboardPage from "./pages/admin/dashboard/Page";
import UsersPage from "./pages/admin/users/Page";
import TransactionsPage from "./pages/admin/transactions/Page";
import ReviewsPage from "./pages/admin/reviews/Page";
import ContactPage from "./pages/admin/contacts/Page";
import ContentPage from "./pages/admin/contentManagement/Page";
import NotificationPage from "./pages/admin/notifications/Page";
import DbBackupPage from "./pages/admin/db-backup/Page";

import HomePage from "./pages/lists/home/HomePage";
import Services from "./pages/lists/Services/Services";
import Experiences from "./pages/lists/Experiences/Experiences";
import WishlistPage from "./pages/lists/Wishlist/WishlistPage";

import { AppProvider } from "./pages/lists/context/Appcontext";

/* ---------------- PROTECTED ROUTE ---------------- */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/" />; // Redirect to login if not logged in
  if (role && user?.role !== role) return <Navigate to="/" />; // Role mismatch
  return children;
};

/* ---------------- APP ---------------- */
const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/wishlist" element={<WishlistPage />} /> {/* ✅ Wishlist Route */}

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <div className="flex h-screen">
                  <Sidebar />
                  <div className="flex-1 p-6 overflow-auto">
                    <DashboardPage />
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* ADMIN SUB-PAGES */}
          <Route path="/admin/users" element={<ProtectedRoute role="admin"><UsersPage /></ProtectedRoute>} />
          <Route path="/admin/reviews" element={<ProtectedRoute role="admin"><ReviewsPage /></ProtectedRoute>} />
          <Route path="/admin/transactions" element={<ProtectedRoute role="admin"><TransactionsPage /></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute role="admin"><ContentPage /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute role="admin"><ContactPage /></ProtectedRoute>} />
          <Route path="/admin/notification" element={<ProtectedRoute role="admin"><NotificationPage /></ProtectedRoute>} />
          <Route path="/admin/dbbackup" element={<ProtectedRoute role="admin"><DbBackupPage /></ProtectedRoute>} />

          {/* CATCH-ALL */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
