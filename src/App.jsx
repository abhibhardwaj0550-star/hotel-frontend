import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./components/AdminLayout";
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

/* -------- PROTECTED ROUTE -------- */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/" />;
  if (role && user?.role !== role) return <Navigate to="/" />;

  return children;
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* PUBLIC ROUTES (NO SIDEBAR) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/wishlist" element={<WishlistPage />} />

          {/* ADMIN ROUTES (WITH SIDEBAR) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="content" element={<ContentPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="notification" element={<NotificationPage />} />
            <Route path="dbbackup" element={<DbBackupPage />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
